import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdminPage } from "@/lib/admin/session";
import { prisma } from "@/lib/db";
import type { TiptapDoc } from "@/lib/posts/render";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24">
      <AdminHeader />
      <PostEditor
        post={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: (post.body ?? { type: "doc", content: [] }) as TiptapDoc,
          coverSrc: post.coverSrc ?? "",
          coverAlt: post.coverAlt ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
