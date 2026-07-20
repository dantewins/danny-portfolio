export type ProjectSlug =
  | "swordle"
  | "scioly"
  | "huracan"
  | "bunni"
  | "expounder";

export type CaseSection = {
  id: string;
  nav: string;
  // Asterisks mark the words rendered in the site's italic serif accent.
  title: string;
  body: string;
  bullets?: string[];
};

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
