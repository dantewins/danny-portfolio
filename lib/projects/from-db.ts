import type {
  CaseSection as CaseSectionRow,
  CaseSlide as CaseSlideRow,
  CaseStudy,
} from "@prisma/client";
import type {
  CaseSection,
  CaseSlide,
  Project,
  SlideLayout,
  SlideTheme,
} from "@/lib/projects/types";
import { SLIDE_LAYOUTS, SLIDE_THEMES } from "@/lib/projects/types";

type CaseStudyWithSections = CaseStudy & {
  sections: CaseSectionRow[];
  slides: CaseSlideRow[];
};

function toSlide(row: CaseSlideRow): CaseSlide {
  return {
    eyebrow: row.eyebrow,
    headline: row.headline,
    subhead: row.subhead,
    image: {
      src: row.imageSrc,
      alt: row.imageAlt,
      width: row.imageWidth,
      height: row.imageHeight,
    },
    theme: (SLIDE_THEMES as readonly string[]).includes(row.theme)
      ? (row.theme as SlideTheme)
      : "light",
    layout: (SLIDE_LAYOUTS as readonly string[]).includes(row.layout)
      ? (row.layout as SlideLayout)
      : "left",
  };
}

/**
 * Rebuilds the discriminated union from a row's `kind` plus its JSON payload.
 * The admin writes these, so a malformed payload degrades to a prose section
 * rather than throwing and taking down the whole page.
 */
function toSection(row: CaseSectionRow): CaseSection {
  const base = { id: row.anchor, nav: row.nav, title: row.title };
  const data = (row.data ?? {}) as Record<string, unknown>;

  switch (row.kind) {
    case "code":
      if (!data.code) break;
      return {
        ...base,
        kind: "code",
        body: String(data.body ?? ""),
        code: data.code as Extract<CaseSection, { kind: "code" }>["code"],
        caption: String(data.caption ?? ""),
      };
    case "figure":
      if (!data.figure) break;
      return {
        ...base,
        kind: "figure",
        body: String(data.body ?? ""),
        figure: data.figure as Extract<CaseSection, { kind: "figure" }>["figure"],
      };
    case "decision":
      return {
        ...base,
        kind: "decision",
        body: data.body ? String(data.body) : undefined,
        considered: String(data.considered ?? ""),
        shipped: String(data.shipped ?? ""),
        why: String(data.why ?? ""),
      };
    case "comparison":
      if (!data.before || !data.after) break;
      return {
        ...base,
        kind: "comparison",
        body: data.body ? String(data.body) : undefined,
        before: data.before as Extract<
          CaseSection,
          { kind: "comparison" }
        >["before"],
        after: data.after as Extract<
          CaseSection,
          { kind: "comparison" }
        >["after"],
      };
  }

  return {
    ...base,
    body: String(data.body ?? ""),
    bullets: Array.isArray(data.bullets)
      ? (data.bullets as unknown[]).map(String)
      : undefined,
  };
}

export function toProject(row: CaseStudyWithSections): Project {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    shortDescription: row.shortDescription,
    dek: row.dek,
    role: row.role,
    published: row.publishedLabel,
    icon: row.icon,
    featured: row.featured,
    stack: row.stack,
    repository: row.repository ?? undefined,
    live: row.live ?? undefined,
    hero: {
      src: row.heroSrc,
      alt: row.heroAlt,
      width: row.heroWidth,
      height: row.heroHeight,
    },
    slides: [...row.slides].sort((a, b) => a.order - b.order).map(toSlide),
    sections: [...row.sections]
      .sort((a, b) => a.order - b.order)
      .map(toSection),
    flow: row.flow,
    takeaway: row.takeaway,
  };
}
