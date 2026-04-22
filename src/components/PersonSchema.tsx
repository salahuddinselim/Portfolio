import type { Metadata } from "next";

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Salah Uddin Selim",
    "alternateName": ["Salah Selim", "Salam Uddin Selim"],
    "description": "Software Engineer at UIU | Full Stack Developer | CSE Student",
    "image": "https://salahuddinselim-pi.vercel.app/og-image.png",
    "url": "https://salahuddinselim-pi.vercel.app",
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "United International University"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "United International University"
    },
    "knowsAbout": ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Full Stack Development"],
    "sameAs": [
      "https://github.com/salahselim",
      "https://linkedin.com/in/salahselim",
      "https://facebook.com/salahselim",
      "https://instagram.com/salahselim"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "salahuddin.selim@gmail.com",
      "contactType": "personal"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}