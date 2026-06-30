import express from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

// GET /api/loyalty-accounts?user_id=<id> — a user may only read their own account
router.get("/", async (req, res) => {
  const { user_id } = req.query;
  if (user_id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { rows } = await pool.query("SELECT * FROM loyalty_accounts WHERE user_id = $1", [user_id]);
  res.json(rows);
});

// POST /api/loyalty-accounts — a user may only create their own account
router.post("/", async (req, res) => {
  const { user_id, points = 0, lifetime_points = 0, tier = "Researcher", transactions = [] } = req.body;
  if (user_id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { rows } = await pool.query(
    `INSERT INTO loyalty_accounts (user_id, points, lifetime_points, tier, transactions)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (user_id) DO UPDATE SET
       points = EXCLUDED.points,
       lifetime_points = EXCLUDED.lifetime_points,
       tier = EXCLUDED.tier,
       transactions = EXCLUDED.transactions,
       updated_at = now()
     RETURNING *`,
    [user_id, points, lifetime_points, tier, JSON.stringify(transactions)]
  );
  res.status(201).json(rows[0]);
});

export default router;
