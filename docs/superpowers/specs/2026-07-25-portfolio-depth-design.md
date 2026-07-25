# Portfolio depth: technical POV + case study section variants

**Date:** 2026-07-25
**Status:** Approved, ready for planning

## Problem

Two weaknesses, both about what a developer actually gets from the site.

1. **The home page's second section carries no technical signal.** `AboutSection` renders a
   pull quote ("A picture is worth a thousand words") and a collage dialog. It is charming
   and says nothing about how the author builds software.

2. **Every case study has the same shape.** `CaseSection` is one fixed type — `title`,
   `body`, optional `bullets` — and `ArticleSection` renders all of them identically. Across
   five projects the only variable is how many paragraphs there are. There is no code, and
   6 of the 12 project images are never rendered.

## Goals

- The second home section demonstrates engineering judgment, derived from real code.
- Case studies can vary their structure, using code, imagery, and explicit decisions.
- Nothing on the site is fabricated. Every snippet traces to a real file.

## Non-goals

- Redesigning the hero, projects list, or footer.
- Changing the visual language (Poppins / Merriweather / Raleway, zinc palette).
- Adding a CMS or moving case study content out of TypeScript.

---

## Part 1 — Home page section 2

### Change

`components/home/about-section.tsx` is replaced by `components/home/how-i-build.tsx`.
`app/page.tsx` renders `<HowIBuild />` in the second slot.

### Content

Three or four principles. Each is a short title plus one or two sentences. The principles
must be **derived from the author's actual repositories**, not invented — the implementation
step is to read the source first and propose wording second, which the author then edits.

Candidate through-lines already visible in existing case study prose (to be confirmed
against source, not treated as settled):

- Server owns what's true — Swordle's authenticated routes decide game outcomes;
  Expounder retrieves before it prompts.
- Test on the device people actually use — Swordle's touch support was validated against
  live games rather than treated as a CSS pass.

### Styling

Follows the existing section rhythm. Section header uses the `font-raleway text-2xl
leading-relaxed text-zinc-700 sm:text-3xl` treatment shared by `AboutSection` and
`ProjectsSection`. Principle titles use `font-poppins`. Section padding matches its
siblings (`py-20 lg:py-32`).

### Collage disposition

`components/collage/` is **kept exactly as-is** and **not rendered anywhere**. It is already
self-contained with `AboutCollage` as its entry point. Only the `AboutSection` wrapper is
removed. Because nothing imports it, it does not ship in the bundle.

---

## Part 2 — Case study section variants

### Type model

`lib/projects/types.ts` turns `CaseSection` into a discriminated union on `kind`.

```ts
type BaseSection = {
  id: string;
  nav: string;
  // Asterisks mark the words rendered in the site's italic serif accent.
  title: string;
};

type ProseSection = BaseSection & {
  kind?: "prose";
  body: string;
  bullets?: string[];
};

type CodeSection = BaseSection & {
  kind: "code";
  body: string;
  code: {
    filename: string;
    language: string;
    source: string;
    href?: string;
  };
  caption: string;
};

type FigureSection = BaseSection & {
  kind: "figure";
  body: string;
  figure: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    wide?: boolean;
  };
};

type DecisionSection = BaseSection & {
  kind: "decision";
  body?: string;
  considered: string;
  shipped: string;
  why: string;
};

type ComparisonSection = BaseSection & {
  kind: "comparison";
  body?: string;
  before: { src: string; alt: string; label: string; caption: string };
  after: { src: string; alt: string; label: string; caption: string };
};

export type CaseSection =
  | ProseSection
  | CodeSection
  | FigureSection
  | DecisionSection
  | ComparisonSection;
```

**`kind` is optional on `ProseSection` by design.** All five existing data files already
match `ProseSection` exactly, so they keep compiling with no edits. This change is additive,
not a migration.

### Rendering

`components/case-study/article-section.tsx` becomes a dispatcher:

```tsx
switch (section.kind) {
  case "code":       return <CodeSection section={section} />;
  case "figure":     return <FigureSection section={section} />;
  case "decision":   return <DecisionSection section={section} />;
  case "comparison": return <ComparisonSection section={section} />;
  default:           return <ProseSection section={section} />;
}
```

New files under `components/case-study/sections/`:

| File | Purpose |
|---|---|
| `section-heading.tsx` | Shared `h2` + `AccentedText` + `id` + `scroll-mt-28` anchor |
| `prose-section.tsx` | Current `ArticleSection` body, extracted unchanged |
| `code-section.tsx` | Lead-in prose, code block, caption |
| `figure-section.tsx` | Lead-in prose, `next/image`, caption |
| `decision-section.tsx` | Considered / Shipped / Why |
| `comparison-section.tsx` | Two labelled panels side by side |

Every variant renders through `section-heading.tsx`, which keeps nav anchors and the
asterisk-accent convention identical across all five.

### Navigation

`buildCaseNavItems` reads only `section.id` and `section.nav`, both of which live on
`BaseSection`. It requires **no change** and works for every variant. `use-active-section.ts`
observes elements by id and is likewise unaffected.

### Code block styling

**No syntax highlighter.** The site's palette is deliberately restrained — zinc grays,
black, white, with color appearing only in the collage. Snippets are styled like the
existing `ProcessSteps` box: `bg-zinc-100`, `rounded-xl`, monospace, with a filename label
and, where a public repo exists, a "view on GitHub" link to the real file.

If color is wanted later, `shiki` is the fallback choice: it runs at build time inside
React Server Components and adds zero client JavaScript. Not part of this work.

Long lines scroll horizontally inside the block. The page body must never scroll
horizontally.

---

## Part 3 — Content sourcing

### Rule

Every code snippet is a real excerpt from a real file. Nothing is written to look like the
author's code. Decisions and before/afters are likewise grounded in what the source and the
existing case study prose actually show.

### Sources

| Project | Local checkout | Public repo |
|---|---|---|
| swordle | `~/Desktop/swordle` | `github.com/dantewins/swordle` |
| scioly | `~/Desktop/scioly` | none |
| bunni | `~/Desktop/bunni` | none |
| huracan | none | `github.com/dantewins/huracan` |
| expounder | none | `github.com/dantewins/expounder` |

Local source is read directly where it exists. `huracan` and `expounder` are fetched from
GitHub.

### Per-project target

One code section and one decision section each, plus figure or comparison sections built
from the 6 currently-unused images:

| Project | Unused images | Viable image variant |
|---|---|---|
| bunni | `landing.svg` | figure |
| expounder | `landing.svg` | figure |
| huracan | `dashboard.svg` | figure |
| scioly | `features.svg`, `register.svg` | figure ×2, or one comparison |
| swordle | `modes.svg` | figure |

**A comparison section needs two images, and only `scioly` has two spare.** Comparison is
therefore used at most once, and only if `features.svg` and `register.svg` genuinely
represent a before/after — which is unlikely from their names, so the realistic outcome is
that comparison ships as a built and typed variant with no current caller. That is
acceptable: it costs one small component and is ready when a real pair exists. If the
author would rather not carry an uncalled variant, drop `ComparisonSection` from this work
and the other four still stand.

### The no-public-repo case

`scioly` and `bunni` have no public repository, so a reader cannot click through to verify a
snippet. For these two, either omit the `href` on the code block, or skip the code section
entirely and use figure and decision sections instead. Decided per project during
implementation based on whether the snippet stands on its own without a link.

---

## Verification

- `npx tsc --noEmit` reports zero source-file errors.
- All five case study routes render without runtime errors.
- The sidebar nav lists every section, and clicking each scrolls to it, for every project.
- Every `href` on a code block resolves to a real file (HTTP 200).
- No page scrolls horizontally at 320px width, including code blocks.
- `components/collage/` still exists and is imported by nothing.

## Risks

- **Content quality dominates.** The components are roughly a third of the effort; reading
  five codebases for honest snippets and decisions is the rest.
- **Derived principles may not sound like the author.** Part 1 wording is proposed for
  editing, not shipped as final.
- **Variant sprawl.** Five section types is the ceiling. More variants would make case
  studies inconsistent rather than varied.
