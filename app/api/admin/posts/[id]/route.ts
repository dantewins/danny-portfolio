import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/session";
import { prisma } from "@/lib/db";
import { POSTS_TAG } from "@/lib/posts";

type Params = { params: Promise<{ id: string }> };

function bustCaches(slug?: string) {
  revalidateTag(POSTS_TAG, { expire: 0 });
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const nextSlug =
    body.slug === undefined ? current.slug : String(body.slug).trim();

  if (!nextSlug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  if (nextSlug !== current.slug) {
    const clash = await prisma.post.findUnique({ where: { slug: nextSlug } });
    if (clash) {
      return NextResponse.json(
        { error: `A post with the slug "${nextSlug}" already exists` },
        { status: 409 },
      );
    }
  }

  const willPublish =
    body.published === undefined ? current.published : Boolean(body.published);

  const post = await prisma.post.update({
    where: { id },
    data: {
      slug: nextSlug,
      title: body.title === undefined ? undefined : String(body.title),
      excerpt: body.excerpt === undefined ? undefined : String(body.excerpt),
      body: body.body === undefined ? undefined : (body.body as object),
      coverSrc:
        body.coverSrc === undefined
          ? undefined
          : body.coverSrc
            ? String(body.coverSrc)
            : null,
      coverAlt:
        body.coverAlt === undefined
          ? undefined
          : body.coverAlt
            ? String(body.coverAlt)
            : null,
      published: willPublish,
      // Stamp the first publish; never move the date on later edits.
      publishedAt:
        willPublish && !current.publishedAt ? new Date() : current.publishedAt,
    },
  });

  bustCaches(current.slug);
  bustCaches(post.slug);

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.post.delete({ where: { id } });
  bustCaches(post.slug);

  return NextResponse.json({ ok: true });
}
