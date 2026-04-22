import type { Metadata, Viewport } from "next";
import { createClient } from "@/lib/supabase";
import PersonSchema from "@/components/PersonSchema";
import "../styles/globals.css";

export const revalidate = 60;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export async function generateMetadata(): Promise<Metadata> {
  let title = "Portfolio | Interactive Developer Portfolio";
  let description = "An interactive terminal-style portfolio with modern UI showcasing projects, skills, and experience.";
  let siteName = "Developer Portfolio";
  let image = "/og-image.png";
  
  try {
    const supabase = createClient();
    const { data: profile } = await supabase.from("profiles").select("name, role, bio, profile_image").limit(1).maybeSingle();
    
    if (profile) {
      title = `${profile.name} | ${profile.role || 'Portfolio'}`;
      description = profile.bio || description;
      siteName = profile.name;
      if (profile.profile_image) image = profile.profile_image;
    }
  } catch (e) {
    // Use defaults if database not connected
  }

  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://salahuddinselim-pi.vercel.app";

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: "%s | " + siteName,
    },
    description,
    keywords: ["portfolio", "developer", "programmer", "full stack", "web developer", "software engineer", "projects"],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    openGraph: {
      title,
      description,
      url: url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-slate-950 text-slate-200 antialiased">
        <PersonSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}