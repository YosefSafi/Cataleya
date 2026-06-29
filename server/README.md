# Cattleya Labs API

Express backend replacing the Base44 SDK calls in the frontend: auth (register/OTP/login/reset),
loyalty accounts, lab result (COA) storage, file uploads, and newsletter signups.

## Local development

```bash
cp .env.example .env
docker compose up -d        # starts local Postgres on :5432
npm install
npm run migrate             # creates tables
npm run dev                 # starts the API on :8080
```

By default `EMAIL_PROVIDER=console` and `STORAGE_PROVIDER=local`, so OTP emails are logged to
the terminal and uploaded files are written to `server/uploads/` — no Azure resources needed to
develop locally.

## Endpoints

| Method | Path                          | Auth | Notes |
|--------|-------------------------------|------|-------|
| POST   | /api/auth/register            | No   | Creates an unverified user, emails a 6-digit OTP |
| POST   | /api/auth/resend-otp           | No   | |
| POST   | /api/auth/verify-otp           | No   | Returns `{ access_token }` |
| POST   | /api/auth/login                | No   | Returns `{ access_token }` |
| GET    | /api/auth/me                   | Yes  | |
| POST   | /api/auth/forgot-password      | No   | Always returns 200 to avoid leaking which emails exist |
| POST   | /api/auth/reset-password       | No   | |
| GET    | /api/loyalty-accounts?user_id= | Yes  | User may only read/write their own account |
| POST   | /api/loyalty-accounts          | Yes  | |
| GET    | /api/lab-results?product_id=   | No   | Public, used to render COAs on product pages |
| POST   | /api/lab-results               | Yes  | Any authenticated user can submit one — matches current frontend behavior, but **restrict to staff/admin before launch** |
| POST   | /api/upload                    | Yes  | multipart `file` field, returns `{ file_url }` |
| POST   | /api/newsletter/subscribe      | No   | Idempotent |

Google OAuth login (`loginWithProvider("google")` in the frontend) is **not implemented** —
that needs a Google OAuth app registered and a callback flow, deferred for now.

## Deploying to Azure App Service

1. Provision an Azure Database for PostgreSQL instance and run `npm run migrate` against it
   (point `DATABASE_URL` at it).
2. Provision Azure Communication Services (email) and an Azure Storage account (blob
   container for lab result files), then set `EMAIL_PROVIDER=acs`, `STORAGE_PROVIDER=azure`,
   and the corresponding connection strings/keys as App Service Application Settings.
3. Set `JWT_SECRET` to a long random value, `CORS_ORIGIN` to your deployed frontend URL, and
   `FRONTEND_URL` (used in password reset email links).
4. Deploy this `server/` folder as the App Service's deployment root, with `npm install` and
   `npm start` as the build/run commands (Node 18+ Linux runtime).
