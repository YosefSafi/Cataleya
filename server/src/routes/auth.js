import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { pool } from "../db/pool.js";
import { signToken } from "../lib/jwt.js";
import { sendEmail } from "../lib/email.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
router.use(authLimiter);

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

function generateOtp() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, "0");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// POST /api/auth/register — create an unverified user and email an OTP code
router.post("/register", async (req, res) => {
  const parsed = z.object({ email: emailSchema, password: passwordSchema }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { email, password } = parsed.data;

  const existing = await pool.query("SELECT id, email_verified FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0 && existing.rows[0].email_verified) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const otp = generateOtp();
  const otpHash = hashToken(otp);
  const expiresAt = new Date(Date.now() + Number(process.env.OTP_EXPIRES_MINUTES || 10) * 60 * 1000);

  if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE users SET password_hash = $1, otp_code_hash = $2, otp_expires_at = $3 WHERE email = $4",
      [passwordHash, otpHash, expiresAt, email]
    );
  } else {
    await pool.query(
      "INSERT INTO users (email, password_hash, otp_code_hash, otp_expires_at) VALUES ($1, $2, $3, $4)",
      [email, passwordHash, otpHash, expiresAt]
    );
  }

  await sendEmail({
    to: email,
    subject: "Your Cattleya Labs verification code",
    html: `<p>Your verification code is <strong>${otp}</strong>. It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.</p>`,
  });

  res.json({ message: "Verification code sent" });
});

// POST /api/auth/resend-otp
router.post("/resend-otp", async (req, res) => {
  const parsed = z.object({ email: emailSchema }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { email } = parsed.data;

  const { rows } = await pool.query("SELECT id FROM users WHERE email = $1 AND email_verified = FALSE", [email]);
  if (rows.length === 0) {
    return res.json({ message: "If that account exists, a new code has been sent" });
  }

  const otp = generateOtp();
  const otpHash = hashToken(otp);
  const expiresAt = new Date(Date.now() + Number(process.env.OTP_EXPIRES_MINUTES || 10) * 60 * 1000);
  await pool.query("UPDATE users SET otp_code_hash = $1, otp_expires_at = $2 WHERE email = $3", [otpHash, expiresAt, email]);

  await sendEmail({
    to: email,
    subject: "Your Cattleya Labs verification code",
    html: `<p>Your verification code is <strong>${otp}</strong>. It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.</p>`,
  });

  res.json({ message: "If that account exists, a new code has been sent" });
});

// POST /api/auth/verify-otp — verifies the code and returns an access token
router.post("/verify-otp", async (req, res) => {
  const parsed = z.object({ email: emailSchema, otpCode: z.string().length(6) }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { email, otpCode } = parsed.data;

  const { rows } = await pool.query(
    "SELECT id, otp_code_hash, otp_expires_at FROM users WHERE email = $1",
    [email]
  );
  if (rows.length === 0) {
    return res.status(400).json({ error: "Invalid code" });
  }
  const user = rows[0];
  if (!user.otp_code_hash || !user.otp_expires_at || new Date(user.otp_expires_at) < new Date()) {
    return res.status(400).json({ error: "Code expired, please request a new one" });
  }
  if (hashToken(otpCode) !== user.otp_code_hash) {
    return res.status(400).json({ error: "Invalid code" });
  }

  await pool.query(
    "UPDATE users SET email_verified = TRUE, otp_code_hash = NULL, otp_expires_at = NULL WHERE id = $1",
    [user.id]
  );

  const access_token = signToken(user.id);
  res.json({ access_token });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const parsed = z.object({ email: emailSchema, password: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { email, password } = parsed.data;

  const { rows } = await pool.query(
    "SELECT id, password_hash, email_verified FROM users WHERE email = $1",
    [email]
  );
  if (rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  if (!user.email_verified) {
    return res.status(403).json({ error: "Please verify your email before logging in" });
  }

  const access_token = signToken(user.id);
  res.json({ access_token });
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  res.json(req.user);
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  const parsed = z.object({ email: emailSchema }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { email } = parsed.data;

  const { rows } = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  // Always respond the same way whether or not the account exists, to avoid leaking which emails are registered.
  if (rows.length > 0) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 30) * 60 * 1000);
    await pool.query(
      "INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
      [rows[0].id, hashToken(resetToken), expiresAt]
    );

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Reset your Cattleya Labs password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in ${process.env.RESET_TOKEN_EXPIRES_MINUTES || 30} minutes.</p>`,
    });
  }

  res.json({ message: "If that account exists, a reset link has been sent" });
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  const parsed = z.object({ resetToken: z.string().min(1), newPassword: passwordSchema }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { resetToken, newPassword } = parsed.data;
  const tokenHash = hashToken(resetToken);

  const { rows } = await pool.query(
    `SELECT id, user_id FROM password_reset_tokens
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()`,
    [tokenHash]
  );
  if (rows.length === 0) {
    return res.status(400).json({ error: "Invalid or expired reset link" });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [passwordHash, rows[0].user_id]);
  await pool.query("UPDATE password_reset_tokens SET used_at = now() WHERE id = $1", [rows[0].id]);

  res.json({ message: "Password updated" });
});

export default router;
