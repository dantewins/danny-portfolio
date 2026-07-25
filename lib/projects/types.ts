export type ProjectSlug =
  | "swordle"
  | "scioly"
  | "huracan"
  | "bunni"
  | "expounder";

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

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  shortDescription: string;
  dek: string;
  role: string;
  published: string;
  stack: string[];
  repository?: string;
  live?: string;
  hero: ProjectHero;
  sections: CaseSection[];
  flow: string[];
  takeaway: string;
};
