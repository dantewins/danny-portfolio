import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export async function WritingSection() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  // Nothing published yet is a normal state, not an empty shell to render.
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-20 lg:py-32">
      <h6 className="font-raleway text-2xl leading-relaxed text-zinc-700 sm:text-3xl">
        Some things I&rsquo;ve been{" "}
        <i className="font-merriweather font-light">thinking about</i>
      </h6>

      <ul className="mt-8 lg:mt-12">
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-zinc-200 last:border-b">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div className="min-w-0">
                <p className="font-poppins text-xl tracking-tight text-zinc-900 sm:text-2xl">
                  {post.title}
                </p>
                <p className="mt-1 max-w-2xl font-raleway text-base text-zinc-600 sm:text-lg">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {formatDate(post.publishedAt) ? (
                  <span className="font-merriweather text-sm font-light text-zinc-400 italic">
                    {formatDate(post.publishedAt)}
                  </span>
                ) : null}
                <ArrowRight className="size-4 text-zinc-400 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/blog"
        className="group mt-8 inline-flex items-center gap-2 font-poppins text-sm text-zinc-500 transition-colors hover:text-zinc-900 sm:text-base"
      >
        All writing
        <ArrowRight className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
