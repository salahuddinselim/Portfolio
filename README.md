# DevPort - Portfolio Website

A modern, futuristic personal portfolio website with dual-mode interface (Terminal & Website), built with Next.js 16, Tailwind CSS 4, and Framer Motion.

## Features

### Terminal Mode (Default)
- Boot animation in centered box
- Interactive CLI with autocomplete suggestions
- Commands: help, about, skills, projects, contact, resume, gui, clear
- Press Tab to autocomplete commands
- Monospace font for typing

### Website Mode
- Modern glassmorphism UI
- Profile photo with status indicator below bio
- Skills with icons
- Projects with images and live links
- Resume preview and download (ATS-friendly)
- Google Maps integration in contact
- Responsive for all devices

### Admin Panel
Full CRUD for:
- Profile (photo, bio, all social links, status)
- Education (with GPA)
- Experience
- Projects (with images)
- Skills
- Blogs
- Photos

## Quick Start

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000

## Supabase Setup (Required for Admin)

1. Create project at https://supabase.com
2. Go to SQL Editor and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE: profiles
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

-- TABLE: education
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

-- TABLE: experience
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

-- TABLE: skills
CREATE TABLE public.skills (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT skills_pkey PRIMARY KEY (id)
);

-- TABLE: projects
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

-- TABLE: photos
CREATE TABLE public.photos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text,
  category text DEFAULT 'work',
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT photos_pkey PRIMARY KEY (id)
);

-- TABLE: blogs
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

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Public Read)
CREATE POLICY "profiles_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "education_read" ON public.education FOR SELECT USING (true);
CREATE POLICY "experience_read" ON public.experience FOR SELECT USING (true);
CREATE POLICY "skills_read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "projects_read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "photos_read" ON public.photos FOR SELECT USING (true);
CREATE POLICY "blogs_read" ON public.blogs FOR SELECT USING (true);

-- RLS Policies (Auth Write)
CREATE POLICY "profiles_write" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "education_write" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "experience_write" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "skills_write" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "projects_write" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "photos_write" ON public.photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "blogs_write" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.profiles (name, role, bio, vision, location, email, status, github_link, linkedin_link, facebook_link, instagram_link, profile_image)
VALUES ('Your Name', 'Software Engineer', 'Your bio...', 'Your vision...', 'Your Location', 'your@email.com', 'Open to Work', 'https://github.com/username', 'https://linkedin.com/in/username', 'https://facebook.com/username', 'https://instagram.com/username', 'https://images.unsplash.com/photo-...');
```

3. Go to Authentication → Users → Add user to create admin account
4. Configure environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Configuration

Edit profile data in `src/app/page.tsx`:

```javascript
const profile = {
  name: "Your Name",
  role: "Software Engineer",
  bio: "Your bio...",
  vision: "Your vision...",
  location: "Your Location",
  email: "your@email.com",
  profile_image: "URL to photo",
  github_link: "https://github.com/...",
  linkedin_link: "https://linkedin.com/in/...",
  twitter_link: "https://twitter.com/...",
  facebook_link: "https://facebook.com/...",
  instagram_link: "https://instagram.com/...",
  status: "Open to Work",
  map_link: "Google Maps embed URL",
};
```

## Admin Pages

- `/admin/login` - Login (after Supabase setup)
- `/admin/dashboard` - Stats
- `/admin/profile` - Profile & photo
- `/admin/education` - Education with GPA
- `/admin/experience` - Work experience
- `/admin/projects` - Projects with images
- `/admin/skills` - Skills
- `/admin/blogs` - Blog posts
- `/admin/photos` - Photo gallery

## Terminal Commands

| Command | Description |
|---------|------------|
| help | Show all commands |
| about | About me |
| skills | List skills |
| projects | Show projects |
| contact | Contact info |
| resume | Download resume |
| clear | Clear terminal |
| gui | Switch to website |

## Deployment

```bash
npm run build
```

Deploy to Vercel with environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

---

Created by Salah Uddin Selim