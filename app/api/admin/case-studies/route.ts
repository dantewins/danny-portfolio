import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/session";
import { prisma } from "@/lib/db";
import { CASE_STUDIES_TAG } from "@/lib/projects";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      order: true,
      updatedAt: true,
      _count: { select: { sections: true } },
    },
  });

  return NextResponse.json({ caseStudies });
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

  const existing = await prisma.caseStudy.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: `A case study with the slug "${slug}" already exists` },
      { status: 409 },
    );
  }

  const last = await prisma.caseStudy.findFirst({ orderBy: { order: "desc" } });

  const caseStudy = await prisma.caseStudy.create({
    data: {
      slug,
      title,
      category: String(body.category ?? ""),
      shortDescription: String(body.shortDescription ?? ""),
      dek: String(body.dek ?? ""),
      role: String(body.role ?? ""),
      publishedLabel: String(body.publishedLabel ?? ""),
      icon: String(body.icon ?? "note"),
      stack: [],
      heroSrc: String(body.heroSrc ?? ""),
      heroAlt: String(body.heroAlt ?? ""),
      heroWidth: Number(body.heroWidth ?? 1440),
      heroHeight: Number(body.heroHeight ?? 930),
      flow: [],
      takeaway: String(body.takeaway ?? ""),
      order: (last?.order ?? -1) + 1,
    },
  });

  revalidateTag(CASE_STUDIES_TAG, { expire: 0 });
  revalidatePath("/");

  return NextResponse.json({ caseStudy });
}
