import express from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/lab-results?product_id=&is_visible=true — public, used to display COAs on product pages
router.get("/", async (req, res) => {
  const { product_id, is_visible } = req.query;
  const conditions = [];
  const params = [];

  if (product_id) {
    params.push(product_id);
    conditions.push(`product_id = $${params.length}`);
  }
  if (is_visible !== undefined) {
    params.push(is_visible === "true");
    conditions.push(`is_visible = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const { rows } = await pool.query(
    `SELECT * FROM lab_results ${where} ORDER BY test_date DESC NULLS LAST`,
    params
  );
  res.json(rows);
});

// POST /api/lab-results — requires auth (matches existing frontend behavior; consider
// restricting to staff/admin accounts before going live, since any logged-in user can
// currently submit a COA for any product).
router.post("/", requireAuth, async (req, res) => {
  const { product_id, product_name, test_date, file_url, is_visible = true } = req.body;
  if (!product_id || !file_url) {
    return res.status(400).json({ error: "product_id and file_url are required" });
  }
  const { rows } = await pool.query(
    `INSERT INTO lab_results (product_id, product_name, test_date, file_url, is_visible, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [product_id, product_name || null, test_date || null, file_url, is_visible, req.user.id]
  );
  res.status(201).json(rows[0]);
});

export default router;
