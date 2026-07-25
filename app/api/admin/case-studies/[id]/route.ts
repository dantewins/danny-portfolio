import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/session";
import { prisma } from "@/lib/db";
import { CASE_STUDIES_TAG } from "@/lib/projects";

type Params = { params: Promise<{ id: string }> };

const KINDS = ["prose", "code", "figure", "decision", "comparison"];
const LAYOUTS = ["left", "right", "top", "overlay"];

type IncomingSection = {
  kind?: string;
  anchor?: string;
  nav?: string;
  title?: string;
  data?: unknown;
};

type IncomingSlide = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  theme?: string;
  layout?: string;
};

function bustCaches(slug?: string) {
  revalidateTag(CASE_STUDIES_TAG, { expire: 0 });
  revalidatePath("/");
  if (slug) revalidatePath(`/work/${slug}`);
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : undefined;
}

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { order: "asc" } },
      slides: { orderBy: { order: "asc" } },
    },
  });

  if (!caseStudy) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ caseStudy });
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

  const current = await prisma.caseStudy.findUnique({ where: { id } });
  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const nextSlug =
    body.slug === undefined ? current.slug : String(body.slug).trim();

  if (!nextSlug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  if (nextSlug !== current.slug) {
    const clash = await prisma.caseStudy.findUnique({
      where: { slug: nextSlug },
    });
    if (clash) {
      return NextResponse.json(
        { error: `A case study with the slug "${nextSlug}" already exists` },
        { status: 409 },
      );
    }
  }

  const slides = Array.isArray(body.slides)
    ? (body.slides as IncomingSlide[])
    : undefined;

  if (slides) {
    const incomplete = slides.find(
      (slide) => !slide.headline?.trim() || !slide.imageSrc?.trim(),
    );
    if (incomplete) {
      return NextResponse.json(
        { error: "Every slide needs a headline and a screenshot" },
        { status: 400 },
      );
    }
  }

  const sections = Array.isArray(body.sections)
    ? (body.sections as IncomingSection[])
    : undefined;

  if (sections) {
    const bad = sections.find(
      (section) => section.kind && !KINDS.includes(section.kind),
    );
    if (bad) {
      return NextResponse.json(
        { error: `Unknown section kind "${bad.kind}"` },
        { status: 400 },
      );
    }

    const missingAnchor = sections.find((section) => !section.anchor?.trim());
    if (missingAnchor) {
      return NextResponse.json(
        { error: "Every section needs an anchor" },
        { status: 400 },
      );
    }

    const anchors = sections.map((section) => section.anchor);
    if (new Set(anchors).size !== anchors.length) {
      return NextResponse.json(
        { error: "Section anchors must be unique within a case study" },
        { status: 400 },
      );
    }
  }

  // Replace sections wholesale so reordering and deletion are a single write.
  const updated = await prisma.$transaction(async (tx) => {
    const caseStudy = await tx.caseStudy.update({
      where: { id },
      data: {
        slug: nextSlug,
        title: body.title === undefined ? undefined : String(body.title),
        category:
          body.category === undefined ? undefined : String(body.category),
        shortDescription:
          body.shortDescription === undefined
            ? undefined
            : String(body.shortDescription),
        dek: body.dek === undefined ? undefined : String(body.dek),
        role: body.role === undefined ? undefined : String(body.role),
        publishedLabel:
          body.publishedLabel === undefined
            ? undefined
            : String(body.publishedLabel),
        icon: body.icon === undefined ? undefined : String(body.icon),
        featured:
          body.featured === undefined ? undefined : Boolean(body.featured),
        stack: asStringArray(body.stack),
        repository:
          body.repository === undefined
            ? undefined
            : body.repository
              ? String(body.repository)
              : null,
        live:
          body.live === undefined ? undefined : body.live ? String(body.live) : null,
        heroSrc: body.heroSrc === undefined ? undefined : String(body.heroSrc),
        heroAlt: body.heroAlt === undefined ? undefined : String(body.heroAlt),
        heroWidth:
          body.heroWidth === undefined ? undefined : Number(body.heroWidth),
        heroHeight:
          body.heroHeight === undefined ? undefined : Number(body.heroHeight),
        flow: asStringArray(body.flow),
        takeaway:
          body.takeaway === undefined ? undefined : String(body.takeaway),
        order: body.order === undefined ? undefined : Number(body.order),
      },
    });

    if (slides) {
      await tx.caseSlide.deleteMany({ where: { caseStudyId: id } });
      if (slides.length > 0) {
        await tx.caseSlide.createMany({
          data: slides.map((slide, order) => ({
            caseStudyId: id,
            order,
            eyebrow: String(slide.eyebrow ?? ""),
            headline: String(slide.headline ?? ""),
            subhead: String(slide.subhead ?? ""),
            imageSrc: String(slide.imageSrc ?? ""),
            imageAlt: String(slide.imageAlt ?? ""),
            imageWidth: Number(slide.imageWidth ?? 1440),
            imageHeight: Number(slide.imageHeight ?? 930),
            theme: slide.theme === "ink" ? "ink" : "light",
            layout: LAYOUTS.includes(String(slide.layout))
              ? String(slide.layout)
              : "left",
          })),
        });
      }
    }

    if (sections) {
      await tx.caseSection.deleteMany({ where: { caseStudyId: id } });
      if (sections.length > 0) {
        await tx.caseSection.createMany({
          data: sections.map((section, order) => ({
            caseStudyId: id,
            order,
            kind: section.kind ?? "prose",
            anchor: String(section.anchor).trim(),
            nav: String(section.nav ?? ""),
            title: String(section.title ?? ""),
            data: (section.data ?? {}) as object,
          })),
        });
      }
    }

    return caseStudy;
  });

  bustCaches(current.slug);
  bustCaches(updated.slug);

  return NextResponse.json({ caseStudy: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({ where: { id } });
  if (!caseStudy) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Sections cascade via the schema relation.
  await prisma.caseStudy.delete({ where: { id } });
  bustCaches(caseStudy.slug);

  return NextResponse.json({ ok: true });
}
