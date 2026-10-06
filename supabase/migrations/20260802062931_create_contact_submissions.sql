/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
- `id` (uuid, primary key)
- `name` (text, not null) — submitter's full name
- `contact` (text, not null) — email or phone number provided by the user
- `message` (text, not null) — the message body
- `created_at` (timestamptz, default now)
2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated to INSERT (public contact form, no sign-in).
- No SELECT/UPDATE/DELETE for anon or authenticated — submissions are private to the project owner (read via service role / dashboard only).
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
