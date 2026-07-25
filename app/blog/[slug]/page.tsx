import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyTopBar } from "@/components/case-study/case-study-top-bar";
import { getPost, getPublishedPosts } from "@/lib/posts";
import { RenderedPost } from "@/lib/posts/render";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// A post published in the admin should appear without a redeploy.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { description: post.excerpt };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen antialiased">
      <div className="mx-auto max-w-5xl px-6">
        <CaseStudyTopBar />

        <article className="max-w-3xl pb-24 lg:pb-32">
          <header className="mt-8 sm:mt-12">
            {date ? (
              <p className="font-merriweather text-sm font-light text-zinc-400 italic">
                {date}
              </p>
            ) : null}
            <h1 className="mt-3 font-poppins text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 font-raleway text-lg leading-relaxed text-zinc-800 sm:text-xl">
              {post.excerpt}
            </p>
          </header>

          {post.cover ? (
            <div className="mt-10 overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mt-10">
            <RenderedPost doc={post.body} />
          </div>
        </article>
      </div>
    </div>
  );
}
