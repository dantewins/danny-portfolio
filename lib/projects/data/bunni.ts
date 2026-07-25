import type { Project } from "@/lib/projects/types";

export const bunni = {
  slug: "bunni",
  title: "Bunni",
  category: "Academic workflow integration",
  shortDescription:
    "A Notion-backed academic calendar with timezone-aware day views and a prototype Canvas synchronization pipeline.",
  dek: "A Notion-backed academic calendar with a Canvas sync pipeline. Most of the engineering is making two external data models agree about identity, schema, dates, and failure.",
  role: "Full-stack",
  icon: "rabbit",
  published: "August 2025",
  stack: [
    "Next.js 15",
    "TypeScript",
    "Prisma",
    "Notion API",
    "Gemini",
    "Vercel Cron",
  ],
  repository: "https://github.com/dantewins/bunni",
  live: "https://bunni-nine.vercel.app",
  hero: {
    src: "/work/bunni/preview.jpg",
    alt: "Bunni landing page describing the Notion-backed calendar workflow",
    width: 1280,
    height: 720,
  },
  sections: [
    {
      id: "notion-first",
      nav: "Notion first",
      title: "Notion is the *identity* boundary",
      body: "OAuth with Notion upserts the user, stores tokens, and signs a seven-day session. Setup validates the calendar database, its parent page, and required properties up front, so a loose workspace fails loudly during onboarding instead of quietly rendering empty weeks.",
    },
    {
      id: "timezones",
      nav: "Timezones",
      title: "Fixing the *day-shift* bug properly",
      body: "Notion dates arrive as date-only values, offset timestamps, or floating timestamps, and naive comparison shifts assignments across days. A dedicated date layer normalizes all three into the user's timezone before anything reaches the calendar.",
      bullets: [
        "Date-only values compare as calendar keys, not UTC instants",
        "Query ranges span local midnight to local midnight",
        "The browser's timezone rides along on every calendar request",
      ],
    },
    {
      kind: "code",
      id: "day-key",
      nav: "Day keys",
      title: "A date is a *string*, not an instant",
      body: "The bug was assignments landing on the wrong day for anyone east or west of the server. The cause was comparing timestamps when the question was never about instants — it was about which calendar day a user is looking at.",
      code: {
        filename: "src/lib/date.ts",
        language: "ts",
        source: `export const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone

export function dayKeyInTZ(d: Date, tz = TZ) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(d)
    const get = (t: string) => parts.find((p) => p.type === t)?.value!
    return \`\${get("year")}-\${get("month")}-\${get("day")}\`
}`,
        href: "https://github.com/dantewins/bunni/blob/main/src/lib/date.ts#L1-L13",
      },
      caption:
        "Formatting in the target timezone and reassembling the parts yields a YYYY-MM-DD key that compares as a calendar day. Date-only values, offset timestamps, and floating timestamps all collapse to the same representation before anything downstream sees them.",
    },
    {
      kind: "figure",
      id: "surface",
      nav: "Surface",
      title: "The calendar was the *easy* half",
      body: "What the product promises is a tidy academic calendar. What it actually required was two external systems agreeing on identity, schema, dates, and failure.",
      figure: {
        src: "/work/bunni/landing.svg",
        alt: "Bunni landing page describing the Notion-backed calendar workflow",
        width: 1200,
        height: 800,
        caption:
          "Notion owns identity and storage; Canvas owns the source data. Bunni's job is reconciling them without either one noticing.",
      },
    },
    {
      id: "canvas-sync",
      nav: "Canvas sync",
      title: "An *idempotent* Canvas pass",
      body: "A daily cron pulls unfinished Canvas assignments, classifies them with Gemini, and writes Notion pages keyed by a content hash. Unchanged items skip the model, changed ones update only what differs, and vanished ones get marked complete.",
    },
  ],
  flow: [
    "Canvas courses and planner items",
    "Filtered to a bounded window",
    "Gemini classifies changed items",
    "Notion pages created or patched",
    "Daily cron reconciles",
  ],
  takeaway:
    "The hardest part wasn't the calendar. It was making Notion and Canvas agree about time.",
} satisfies Project;
