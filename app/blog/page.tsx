import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyTopBar } from "@/components/case-study/case-study-top-bar";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  description: "Writing by Danny Kim on building web products and AI workflows.",
};

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen antialiased">
      <div className="mx-auto max-w-5xl px-6">
        <CaseStudyTopBar backLabel="Home" backHref="/" />

        <main className="max-w-3xl pb-24 lg:pb-32">
          <h1 className="mt-8 font-poppins text-5xl font-medium tracking-tight text-zinc-900 sm:mt-12 sm:text-6xl">
            Writing
          </h1>

          {posts.length === 0 ? (
            <p className="mt-6 font-raleway text-lg text-zinc-600">
              Nothing published yet.
            </p>
          ) : (
            <ul className="mt-10 sm:mt-14">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border-t border-zinc-200 last:border-b"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-6"
                  >
                    <p className="font-poppins text-xl tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 sm:text-2xl">
                      {post.title}
                    </p>
                    <p className="mt-1 font-raleway text-base text-zinc-600 sm:text-lg">
                      {post.excerpt}
                    </p>
                    {formatDate(post.publishedAt) ? (
                      <p className="mt-2 font-merriweather text-sm font-light text-zinc-400 italic">
                        {formatDate(post.publishedAt)}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
