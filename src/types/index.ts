export interface Profile {
  id: string;
  name: string | null;
  role: string | null;
  bio: string | null;
  vision: string | null;
  location: string | null;
  profile_image: string | null;
  email: string | null;
  github_link: string | null;
  linkedin_link: string | null;
  twitter_link: string | null;
  contact_email: string | null;
  facebook_link: string | null;
  instagram_link: string | null;
  discord_username: string | null;
  phone: string | null;
  coursework: string | null;
  achievements: string | null;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string | null;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  grade: string | null;
  description: string | null;
  currently_studying: boolean;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  currently_working: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[] | null;
  github_link: string | null;
  live_link: string | null;
  image: string | null;
  category: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string | null;
  category: string;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}