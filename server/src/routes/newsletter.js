import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { pool } from "../db/pool.js";

const router = express.Router();
router.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

// POST /api/newsletter/subscribe — public, idempotent
router.post("/subscribe", async (req, res) => {
  const parsed = z.object({ email: z.string().email() }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { email } = parsed.data;

  await pool.query(
    "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
    [email]
  );
  res.json({ message: "Subscribed" });
});

export default router;
