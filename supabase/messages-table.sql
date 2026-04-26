-- Messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow inserts from authenticated users
CREATE POLICY "Allow insert for authenticated users" ON messages
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow select for authenticated users
CREATE POLICY "Allow select for authenticated users" ON messages
  FOR SELECT TO authenticated USING (true);

-- Allow update for authenticated users
CREATE POLICY "Allow update for authenticated users" ON messages
  FOR UPDATE TO authenticated USING (true);

-- Allow delete for authenticated users
CREATE POLICY "Allow delete for authenticated users" ON messages
  FOR DELETE TO authenticated USING (true);

-- Allow public read for checking (for the contact form)
CREATE POLICY "Allow public insert" ON messages
  FOR INSERT TO public WITH CHECK (true);