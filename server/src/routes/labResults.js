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

// POST /api/lab-results — admin only, matching the upload UI which is only shown to admins
router.post("/", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { product_id, product_name, lab_name, batch_number, test_date, purity_percent, pdf_url, is_visible = true } = req.body;
  if (!product_id || !pdf_url) {
    return res.status(400).json({ error: "product_id and pdf_url are required" });
  }
  const { rows } = await pool.query(
    `INSERT INTO lab_results (product_id, product_name, lab_name, batch_number, test_date, purity_percent, pdf_url, is_visible, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [product_id, product_name || null, lab_name || null, batch_number || null, test_date || null, purity_percent || null, pdf_url, is_visible, req.user.id]
  );
  res.status(201).json(rows[0]);
});

export default router;
