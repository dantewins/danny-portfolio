import type { Project } from "@/lib/projects/types";

export const huracan = {
  slug: "huracan",
  title: "Huracan",
  category: "Multimodal recovery assistant",
  shortDescription:
    "A chat-based hurricane recovery tool that combines damage-image analysis, repair guidance, location context, and FEMA data.",
  dek: "A chat tool for hurricane recovery: photos of damage go in, and structured repair guidance comes out, grounded in location context and FEMA data.",
  role: "Full-stack + AI",
  published: "October 2025",
  stack: [
    "Next.js 15",
    "TypeScript",
    "Prisma",
    "Postgres",
    "Azure Vision",
    "Gemini",
  ],
  repository: "https://github.com/dantewins/huracan",
  live: "https://huracan-eosin.vercel.app",
  hero: {
    src: "/work/huracan/preview.jpg",
    alt: "Huracan dashboard with its inspection composer and saved-chat sidebar",
    width: 1280,
    height: 720,
  },
  sections: [
    {
      id: "pipeline",
      nav: "Pipeline",
      title: "One answer from *five* systems",
      body: "Each message runs a chain: Gemini extracts an address, Nominatim geocodes it, Azure Vision analyzes every photo, FEMA's API surfaces disaster declarations, and a final Gemini pass composes the reply that lands back in the thread.",
    },
    {
      id: "structure",
      nav: "Structure",
      title: "Making model output *hold shape*",
      body: "Repair advice needs priority, cost, time, and materials as fields, not prose. The prompt demands explicit markers, a parser turns them into typed solution cards, and Markdown remains the fallback when the shape isn't there.",
      bullets: [
        "Vision results reduce to visible damage and structural keywords",
        "Cards keep priority, cost, time, and materials as separate fields",
        "Unknown priorities default to medium instead of crashing the parse",
      ],
    },
    {
      id: "ownership",
      nav: "Ownership",
      title: "Inspections are *owned*",
      body: "Sessions are bcrypt-hashed and cookie-bound, and every read or write checks the inspection's owner, so guessing a route ID gets you nothing. Optimistic sends, error states, and an abort control keep the chat honest while the pipeline runs.",
    },
  ],
  flow: [
    "Message and photos saved",
    "Address extracted and geocoded",
    "Azure Vision analyzes each image",
    "FEMA declarations fetched",
    "Gemini composes the reply",
  ],
  takeaway:
    "An AI feature is an integration problem before it is a prompt problem.",
} satisfies Project;
