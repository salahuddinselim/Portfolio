<<<<<<< HEAD
# Portfolio Website

An interactive terminal-style portfolio with visual UI and admin panel. Data is stored in Supabase database.

## Quick Setup (For Non-Technical Users)

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and create a free account
3. Create a new project (name: portfolio, password: create a strong password)

### Step 2: Setup Database

1. In Supabase dashboard, click **SQL Editor** in the left menu
2. Copy the contents of `supabase-schema.sql` 
3. Paste and click **Run**
4. You should see "Database schema created successfully!"

### Step 3: Get Your Credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL** (save as `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public key** (save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### Step 4: Create Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **Add user**
3. Enter your email and password
4. Click **Create user**

### Step 5: Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. click **Add New...** → **Project**
4. Import your GitHub repository
5. In **Environment Variables**, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
6. Click **Deploy**

### Step 6: Configure Your Portfolio

1. Go to `your-domain.com/login`
2. Sign in with your admin account
3. Click **Settings** to upload your logo and set site title
4. Click **Profile** to add your name, bio, photo, social links
5. Add your education, experience, skills, and projects

---

## Development Setup (For Developers)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd portfolio
npm install
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Key Features

- **Dual Mode**: Terminal interface (default) or Visual UI
- **Dynamic Data**: All content from Supabase database
- **Admin Panel**: Manage all content at `/admin`
- **Image Upload**: Upload images directly from admin
- **Responsive**: Works on all devices

---

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Main dual-mode homepage
│   ├── admin/                 # Admin dashboard
│   │   ├── settings/         # Logo & title settings
│   │   ├── profile/          # Profile management
│   │   ├── education/       # Education CRUD
│   │   ├── experience/      # Experience CRUD
│   │   ├── skills/          # Skills management
│   │   └── projects/        # Projects CRUD
│   └── login/               # Admin login
├── components/
│   ├── terminal/            # Terminal component
│   └── website/             # Website sections
└── lib/
    └── supabase.ts          # Supabase client
```

---

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS v4
- Framer Motion
- Supabase

---

## Troubleshooting

### "Please sign in" error
- Make sure you're signed in at `/login`
- Check your Supabase URL and anon key are correct

### Images not uploading
- Check storage bucket exists in Supabase
- Verify RLS policies allow uploads

### Data not showing
- Run the SQL schema in Supabase SQL Editor
- Check you have data in each table

### Need help?
- Open an issue on GitHub
- Email: support@example.com
=======
# Portfolio
>>>>>>> 131cdf539f08a1c116af5443be2d7515b5c2a2b4
