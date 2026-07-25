import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/session";
import { prisma } from "@/lib/db";
import { POSTS_TAG } from "@/lib/posts";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      published: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  const slug = String(body.slug ?? "").trim();
  const title = String(body.title ?? "").trim();

  if (!slug || !title) {
    return NextResponse.json(
      { error: "Slug and title are required" },
      { status: 400 },
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: `A post with the slug "${slug}" already exists` },
      { status: 409 },
    );
  }

  const post = await prisma.post.create({
    data: {
      slug,
      title,
      excerpt: String(body.excerpt ?? ""),
      body: (body.body ?? { type: "doc", content: [] }) as object,
      published: false,
    },
  });

  revalidateTag(POSTS_TAG, { expire: 0 });
  revalidatePath("/");
  revalidatePath("/blog");

  return NextResponse.json({ post });
}
