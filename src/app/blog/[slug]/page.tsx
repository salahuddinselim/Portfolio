import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  cover_image?: string | null;
  tags?: string[] | null;
  created_at: string;
}

const defaultPost: BlogPost | null = null;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!defaultPost) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-cyan-400 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        {defaultPost.cover_image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={defaultPost.cover_image}
              alt={defaultPost.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{defaultPost.title}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {defaultPost.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full glass text-sm">
              {tag}
            </span>
          ))}
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {defaultPost.content || <p>Content coming soon...</p>}
        </article>
      </div>
    </main>
  );
}