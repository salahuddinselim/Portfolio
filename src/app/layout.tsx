import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salah Uddin Selim | Software Engineer",
  description: "Computer Science and Engineering student at United International University. Passionate about building impactful solutions with modern technologies.",
  keywords: ["software engineer", "full-stack developer", "React", "Next.js", "Python", "portfolio"],
  authors: [{ name: "Salah Uddin Selim" }],
  openGraph: {
    title: "Salah Uddin Selim | Software Engineer",
    description: "Computer Science and Engineering student at United International University",
    type: "website",
    url: "https://your-domain.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salah Uddin Selim",
    description: "Software Engineer portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}