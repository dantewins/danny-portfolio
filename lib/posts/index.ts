import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type { TiptapDoc } from "@/lib/posts/render";

export const POSTS_TAG = "posts";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: TiptapDoc;
  cover?: { src: string; alt: string };
  publishedAt?: string;
};

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: unknown;
  coverSrc: string | null;
  coverAlt: string | null;
  publishedAt: Date | null;
};

function toPost(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: (row.body ?? { type: "doc", content: [] }) as TiptapDoc,
    cover: row.coverSrc
      ? { src: row.coverSrc, alt: row.coverAlt ?? "" }
      : undefined,
    publishedAt: row.publishedAt?.toISOString(),
  };
}

export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return rows.map(toPost);
  },
  ["posts-published"],
  { tags: [POSTS_TAG] },
);

export async function getPost(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}
