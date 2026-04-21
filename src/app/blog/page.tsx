import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image?: string | null;
  tags?: string[] | null;
  created_at: string;
}

const defaultPosts: BlogPost[] = [];

export default async function BlogPage() {
  return (
    <main className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Blog
        </h1>
        <p className="text-gray-400 mb-12">
          Thoughts on software development, technology, and more.
        </p>

        {defaultPosts.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <p className="text-gray-400 mb-4">No blog posts yet.</p>
            <Link href="/" className="text-cyan-400 hover:underline">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {defaultPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="glass rounded-2xl p-6 hover:bg-white/[0.06] transition-colors group"
              >
                {post.cover_image && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-lg bg-white/5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}