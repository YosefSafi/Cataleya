import { verifyToken } from "../lib/jwt.js";
import { pool } from "../db/pool.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = verifyToken(token);
    const { rows } = await pool.query(
      "SELECT id, email, email_verified, created_at FROM users WHERE id = $1",
      [payload.sub]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = rows[0];
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
