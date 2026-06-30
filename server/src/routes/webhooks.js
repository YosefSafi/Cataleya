import express from "express";
import crypto from "crypto";
import { pool } from "../db/pool.js";

const router = express.Router();

// POST /api/webhooks/coinbase — mounted with express.raw() in index.js so we can verify
// the HMAC signature against the exact raw request body.
router.post("/coinbase", async (req, res) => {
  const signature = req.headers["x-cc-webhook-signature"];
  const secret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("COINBASE_COMMERCE_WEBHOOK_SECRET not configured; rejecting webhook");
    return res.status(500).send("Webhook not configured");
  }

  const expected = crypto.createHmac("sha256", secret).update(req.body).digest("hex");
  if (!signature || expected !== signature) {
    return res.status(401).send("Invalid signature");
  }

  let event;
  try {
    event = JSON.parse(req.body.toString("utf8")).event;
  } catch {
    return res.status(400).send("Invalid payload");
  }

  if (event?.type === "charge:confirmed") {
    const orderId = event.data?.metadata?.order_id;
    if (orderId) {
      await pool.query(
        "UPDATE orders SET status = 'paid', updated_at = now() WHERE id = $1",
        [orderId]
      );
    }
  }

  res.status(200).send("OK");
});

export default router;
