import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { NewItemButton } from "@/components/admin/new-item-button";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminDashboard() {
  const [caseStudies, posts] = await Promise.all([
    prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
      select: { id: true, slug: true, title: true, updatedAt: true },
    }),
    prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        published: true,
        updatedAt: true,
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24">
      <AdminHeader />

      <section className="mt-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-poppins text-2xl font-medium tracking-tight text-zinc-900">
            Case studies
          </h2>
          <NewItemButton kind="case-study" />
        </div>

        <ul className="mt-4">
          {caseStudies.map((item) => (
            <li key={item.id} className="border-t border-zinc-200 last:border-b">
              <Link
                href={`/admin/case-studies/${item.id}`}
                className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-zinc-500"
              >
                <span className="font-poppins text-lg text-zinc-900">
                  {item.title}
                </span>
                <span className="shrink-0 font-merriweather text-sm font-light text-zinc-400 italic">
                  /{item.slug} · {formatDate(item.updatedAt)}
                </span>
              </Link>
            </li>
          ))}
          {caseStudies.length === 0 ? (
            <li className="border-t border-zinc-200 py-4 font-raleway text-zinc-500">
              None yet. Run the seed, or create one.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="mt-14">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-poppins text-2xl font-medium tracking-tight text-zinc-900">
            Posts
          </h2>
          <NewItemButton kind="post" />
        </div>

        <ul className="mt-4">
          {posts.map((item) => (
            <li key={item.id} className="border-t border-zinc-200 last:border-b">
              <Link
                href={`/admin/posts/${item.id}`}
                className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-zinc-500"
              >
                <span className="min-w-0 font-poppins text-lg text-zinc-900">
                  {item.title}
                  {item.published ? null : (
                    <span className="ml-2 rounded bg-zinc-100 px-2 py-0.5 font-raleway text-xs text-zinc-500">
                      draft
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-merriweather text-sm font-light text-zinc-400 italic">
                  {formatDate(item.updatedAt)}
                </span>
              </Link>
            </li>
          ))}
          {posts.length === 0 ? (
            <li className="border-t border-zinc-200 py-4 font-raleway text-zinc-500">
              No posts yet.
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
