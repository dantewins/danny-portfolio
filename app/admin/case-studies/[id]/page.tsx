import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { CaseStudyEditor } from "@/components/admin/case-study-editor";
import type { EditableSection } from "@/components/admin/section-builder";
import { requireAdminPage } from "@/lib/admin/session";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();

  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } } },
  });

  if (!caseStudy) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24">
      <AdminHeader />
      <CaseStudyEditor
        caseStudy={{
          id: caseStudy.id,
          slug: caseStudy.slug,
          title: caseStudy.title,
          category: caseStudy.category,
          shortDescription: caseStudy.shortDescription,
          dek: caseStudy.dek,
          role: caseStudy.role,
          publishedLabel: caseStudy.publishedLabel,
          icon: caseStudy.icon,
          stack: caseStudy.stack,
          repository: caseStudy.repository ?? "",
          live: caseStudy.live ?? "",
          heroSrc: caseStudy.heroSrc,
          heroAlt: caseStudy.heroAlt,
          heroWidth: caseStudy.heroWidth,
          heroHeight: caseStudy.heroHeight,
          flow: caseStudy.flow,
          takeaway: caseStudy.takeaway,
          sections: caseStudy.sections.map((section) => ({
            kind: section.kind as EditableSection["kind"],
            anchor: section.anchor,
            nav: section.nav,
            title: section.title,
            data: (section.data ?? {}) as Record<string, unknown>,
          })),
        }}
      />
    </div>
  );
}
