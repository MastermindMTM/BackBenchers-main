/*
# Create farewell_messages table (single-tenant, public board)

1. New Tables
- `farewell_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — the author's real name
  - `nickname` (text) — the author's nickname (optional)
  - `message` (text, not null) — the farewell note body
  - `created_at` (timestamptz, defaults to now)

2. Security
- Enable RLS on `farewell_messages`.
- This is a public, shared message board with NO sign-in, so all four CRUD
  verbs are granted to BOTH `anon` and `authenticated`. Anyone visiting the
  site can post and read farewell notes. `USING (true)` / `WITH CHECK (true)`
  is intentional here because the data is designed to be shared publicly.

3. Important Notes
- No `user_id` column and no `auth.uid()` ownership checks — this app has no
  sign-in screen, so the frontend always connects with the anon key.
- Anon-key SELECT works because the policy lists `anon`; without it the board
  would look empty even though rows exist.
*/

CREATE TABLE IF NOT EXISTS farewell_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  nickname text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE farewell_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_farewell_messages" ON farewell_messages;
CREATE POLICY "anon_select_farewell_messages"
  ON farewell_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_farewell_messages" ON farewell_messages;
CREATE POLICY "anon_insert_farewell_messages"
  ON farewell_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_farewell_messages" ON farewell_messages;
CREATE POLICY "anon_update_farewell_messages"
  ON farewell_messages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_farewell_messages" ON farewell_messages;
CREATE POLICY "anon_delete_farewell_messages"
  ON farewell_messages FOR DELETE
  TO anon, authenticated USING (true);
