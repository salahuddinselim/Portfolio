import type { Metadata } from "next";
import { createClient } from "@/lib/supabase";
import "../styles/globals.css";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let title = "Portfolio | Interactive Developer Portfolio";
  let description = "An interactive terminal-style portfolio with modern UI";
  
  try {
    const supabase = createClient();
    const { data: settings } = await supabase.from("settings").select("*").limit(1).single();
    const { data: profile } = await supabase.from("profile").select("name, title, bio").limit(1).single();
    
    if (settings?.site_title) title = `${settings.site_title} | Portfolio`;
    if (settings?.site_description) description = settings.site_description;
    if (profile?.name) {
      title = `${profile.name} | ${profile.title || 'Portfolio'}`;
      description = profile.bio || description;
    }
  } catch (e) {
    // Use defaults if database not connected
  }

  return {
    title,
    description,
    keywords: ["portfolio", "developer", "programmer", "full stack", "web developer"],
    authors: [{ name: "Portfolio Developer" }],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
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
      <body className="bg-slate-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}