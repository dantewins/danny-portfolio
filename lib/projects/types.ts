// Slugs are author-defined in the admin, so this is a plain string rather than
// a closed union.
export type ProjectSlug = string;

// A @phosphor-icons/react module name, e.g. "Sword". Validated at render time
// against the generated list in lib/icons/names.ts.
export type ProjectIcon = string;

type BaseSection = {
  id: string;
  nav: string;
  // Asterisks mark the words rendered in the site's italic serif accent.
  title: string;
};

// `kind` is optional here so every existing prose section keeps type-checking
// without an edit. New variants must name themselves.
export type ProseSection = BaseSection & {
  kind?: "prose";
  body: string;
  bullets?: string[];
};

export type CodeSection = BaseSection & {
  kind: "code";
  body: string;
  code: {
    filename: string;
    language: string;
    // Verbatim excerpt. Never paraphrase source into this field.
    source: string;
    // Permalink to the real file. Omitted only when there is no public repo.
    href?: string;
  };
  caption: string;
};

export type FigureSection = BaseSection & {
  kind: "figure";
  body: string;
  figure: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
};

export type DecisionSection = BaseSection & {
  kind: "decision";
  body?: string;
  considered: string;
  shipped: string;
  why: string;
};

// Images are optional: a before/after is often two descriptions, not two shots.
export type ComparisonSection = BaseSection & {
  kind: "comparison";
  body?: string;
  before: ComparisonPane;
  after: ComparisonPane;
};

export type ComparisonPane = {
  label: string;
  caption: string;
  image?: ProjectHero;
};

export type CaseSection =
  | ProseSection
  | CodeSection
  | FigureSection
  | DecisionSection
  | ComparisonSection;

export type ProjectHero = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Two fields only. The screenshot is the most colourful thing on a monochrome
// page, so the slide around it stays quiet rather than competing.
export const SLIDE_THEMES = ["light", "ink"] as const;

export type SlideTheme = (typeof SLIDE_THEMES)[number];

// Where the text sits relative to the screenshot.
//   left    text left, screenshot runs off the right edge
//   right   mirrored, screenshot runs off the left edge
//   top     text above, screenshot rises from the bottom edge
//   overlay text on the screenshot, behind a scrim
export const SLIDE_LAYOUTS = ["left", "right", "top", "overlay"] as const;

export type SlideLayout = (typeof SLIDE_LAYOUTS)[number];

export type CaseSlide = {
  eyebrow: string;
  // Asterisks mark the words rendered in the site's italic serif accent.
  headline: string;
  subhead: string;
  image: ProjectHero;
  theme: SlideTheme;
  layout: SlideLayout;
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  shortDescription: string;
  dek: string;
  role: string;
  published: string;
  icon: ProjectIcon;
  featured: boolean;
  stack: string[];
  repository?: string;
  live?: string;
  hero: ProjectHero;
  // Empty until slides are authored; the overview falls back to `hero`.
  slides: CaseSlide[];
  sections: CaseSection[];
  flow: string[];
  takeaway: string;
};
