import type { Project } from "@/lib/projects/types";

export const bunni = {
  slug: "bunni",
  title: "Bunni",
  category: "Academic workflow integration",
  shortDescription:
    "A Notion-backed academic calendar with timezone-aware day views and a prototype Canvas synchronization pipeline.",
  dek: "A Notion-backed academic calendar with a Canvas sync pipeline. Most of the engineering is making two external data models agree about identity, schema, dates, and failure.",
  role: "Full-stack",
  published: "August 2025",
  stack: [
    "Next.js 15",
    "TypeScript",
    "Prisma",
    "Notion API",
    "Gemini",
    "Vercel Cron",
  ],
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
