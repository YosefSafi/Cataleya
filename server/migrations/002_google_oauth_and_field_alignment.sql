-- Google OAuth support: users can now sign in without a password
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Loyalty accounts: align with the fields the Account page actually reads/writes
ALTER TABLE loyalty_accounts ADD COLUMN IF NOT EXISTS lifetime_points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE loyalty_accounts ADD COLUMN IF NOT EXISTS transactions JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Lab results: align column names with what LabResultsSection.jsx actually sends/reads
ALTER TABLE lab_results RENAME COLUMN file_url TO pdf_url;
ALTER TABLE lab_results ADD COLUMN IF NOT EXISTS lab_name TEXT;
ALTER TABLE lab_results ADD COLUMN IF NOT EXISTS batch_number TEXT;
ALTER TABLE lab_results ADD COLUMN IF NOT EXISTS purity_percent NUMERIC;
