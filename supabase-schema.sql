-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: profiles
-- ============================================
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text,
  role text,
  bio text,
  vision text,
  location text,
  profile_image text,
  email text,
  phone text,
  status text DEFAULT 'Open to Work',
  map_link text,
  github_link text,
  linkedin_link text,
  twitter_link text,
  facebook_link text,
  instagram_link text,
  discord_username text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- ============================================
-- TABLE: education
-- ============================================
CREATE TABLE public.education (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  degree text,
  field_of_study text,
  start_date text,
  end_date text,
  grade text,
  currently_studying boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT education_pkey PRIMARY KEY (id)
);

-- ============================================
-- TABLE: experience
-- ============================================
CREATE TABLE public.experience (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text,
  location text,
  start_date text,
  end_date text,
  description text,
  currently_working boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT experience_pkey PRIMARY KEY (id)
);

-- ============================================
-- TABLE: skills
-- ============================================
CREATE TABLE public.skills (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT skills_pkey PRIMARY KEY (id)
);

-- ============================================
-- TABLE: projects
-- ============================================
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  tech_stack text[],
  github_link text,
  live_link text,
  image text,
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

-- ============================================
-- TABLE: photos
-- ============================================
CREATE TABLE public.photos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text,
  category text DEFAULT 'work',
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT photos_pkey PRIMARY KEY (id)
);

-- ============================================
-- TABLE: blogs
-- ============================================
CREATE TABLE public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  cover_image text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blogs_pkey PRIMARY KEY (id)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES (Read Access - Public)
-- ============================================
CREATE POLICY "profiles_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "education_read" ON public.education FOR SELECT USING (true);
CREATE POLICY "experience_read" ON public.experience FOR SELECT USING (true);
CREATE POLICY "skills_read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "projects_read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "photos_read" ON public.photos FOR SELECT USING (true);
CREATE POLICY "blogs_read" ON public.blogs FOR SELECT USING (true);

-- RLS Policies (Write Access - Authenticated Users)
CREATE POLICY "profiles_write" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "education_write" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "experience_write" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "skills_write" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "projects_write" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "photos_write" ON public.photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "blogs_write" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Insert default profile
INSERT INTO public.profiles (name, role, bio, vision, location, email, phone, status, github_link, linkedin_link, facebook_link, instagram_link, profile_image)
VALUES (
  'Salah Uddin Selim',
  'Software Engineer',
  'Computer Science and Engineering student at United International University with strong skills in programming, software development, and problem-solving. Experienced in IoT systems, AI-based applications, and full-stack web development.',
  'Passionate about building impactful solutions and continuously learning modern technologies.',
  'Vatara, Dhaka, Bangladesh',
  'selimsalahuddin19@gmail.com',
  '+880 1234 567890',
  'Open to Work',
  'https://github.com/salahuddinselim',
  'https://linkedin.com/in/salahuddinselim',
  'https://facebook.com/salahuddinselim',
  'https://instagram.com/salahuddinselim',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
);

-- Insert education
INSERT INTO public.education (institution, degree, field_of_study, start_date, end_date, grade, currently_studying)
VALUES 
  ('United International University', 'BSc', 'Computer Science & Engineering', '2022', '', '', true),
  ('Pirganj Govt. College', 'HSC', 'Science', '2018', '2020', '5.00', false),
  ('Pirganj Pilot High School', 'SSC', 'Science', '2013', '2018', '5.00', false);

-- Insert experience
INSERT INTO public.experience (company, position, location, start_date, end_date, description, currently_working)
VALUES
  ('Freelance', 'Full-Stack Developer', 'Remote', '2022', '', 'Building web applications and IoT solutions for clients worldwide.', true);

-- Insert skills
INSERT INTO public.skills (name, category)
VALUES
  ('JavaScript', 'Frontend'),
  ('React', 'Frontend'),
  ('Next.js', 'Frontend'),
  ('TypeScript', 'Languages'),
  ('Python', 'Languages'),
  ('Node.js', 'Backend'),
  ('PostgreSQL', 'Database'),
  ('MySQL', 'Database'),
  ('Git', 'Tools'),
  ('Arduino', 'Tools'),
  ('C++', 'Languages'),
  ('Java', 'Languages');

-- Insert projects
INSERT INTO public.projects (title, description, tech_stack, github_link, image, featured)
VALUES
  ('Automated Fish Pond', 'IoT-based smart water quality monitoring system using Arduino with sensors for temperature, pH, turbidity, and gas.', ARRAY['Arduino', 'C++', 'Sensors', 'IoT'], 'https://github.com/salahuddinselim', 'https://images.unsplash.com/photo-1518182170546-0766ce6f6a56?w=600&h=400&fit=crop', true),
  ('AI Voice Assistant', 'Python-based voice assistant using SpeechRecognition and Pyttsx3 for executing commands.', ARRAY['Python', 'AI', 'Speech Recognition'], 'https://github.com/salahuddinselim', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', true),
  ('TournyMate', 'Full-stack web application using PHP and MySQL to manage tournaments.', ARRAY['PHP', 'MySQL', 'HTML', 'CSS'], 'https://github.com/salahuddinselim', 'https://images.unsplash.com/photo-1460925895917-afdab827c01f?w=600&h=400&fit=crop', false),
  ('Multilevel Puzzle Game', 'JavaFX-based team puzzle game with real-time chat.', ARRAY['Java', 'JavaFX', 'Multithreading'], 'https://github.com/salahuddinselim', 'https://images.unsplash.com/photo-1551103782-8ab07afd45d1?w=600&h=400&fit=crop', false);

-- ============================================
-- DONE!
-- ============================================
SELECT 'Database setup complete!' as status;