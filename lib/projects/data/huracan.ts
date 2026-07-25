import type { Project } from "@/lib/projects/types";

export const huracan = {
  slug: "huracan",
  title: "Huracan",
  category: "Multimodal recovery assistant",
  shortDescription:
    "A chat-based hurricane recovery tool that combines damage-image analysis, repair guidance, location context, and FEMA data.",
  dek: "A chat tool for hurricane recovery: photos of damage go in, and structured repair guidance comes out, grounded in location context and FEMA data.",
  role: "Full-stack + AI",
  icon: "Hurricane",
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
  // Authored in the admin; empty means the hero image is shown instead.
  slides: [],
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
      kind: "code",
      id: "parser",
      nav: "The parser",
      title: "A parser that refuses to *throw*",
      body: "Repair advice arrives as text with labelled lines, and every one of those labels is optional in practice. The parser treats missing and unrecognized fields as normal, because a model that formats a cost slightly differently should not take down the message.",
      code: {
        filename: "src/lib/gemini.ts",
        language: "ts",
        source: `const solution: Partial<Solution> = {
    title,
    priority: 'medium',
    description: '',
    estimated_cost: undefined,
    estimated_time: undefined,
    resources_needed: []
};

for (const line of lines.slice(1)) {
    if (line.match(/^PRIORITY:/i)) {
        const priority = line.replace(/^PRIORITY:/i, '').trim().toLowerCase();
        if (priority.includes('high')) solution.priority = 'high';
        else if (priority.includes('low')) solution.priority = 'low';
        else solution.priority = 'medium';
    } else if (line.match(/^COST:/i)) {
        solution.estimated_cost = line.replace(/^COST:/i, '').trim();
    }
}`,
        href: "https://github.com/dantewins/huracan/blob/main/src/lib/gemini.ts#L125-L149",
      },
      caption:
        "Every field starts with a usable default, so an unparsed line costs one value instead of the whole card. When no solutions parse at all, the message falls back to rendering as plain Markdown.",
    },
    {
      kind: "decision",
      id: "markers",
      nav: "Markers",
      title: "Making the prompt carry the *schema*",
      body: "Repair guidance needs priority, cost, time, and materials as separate fields so the interface can rank and group them.",
      considered:
        "Let the model answer naturally and extract fields from the prose afterwards",
      shipped:
        "Require explicit PRIORITY / COST / TIME / RESOURCES markers and parse line by line",
      why: "Extracting structure from free prose means guessing, and guessing wrong is silent. Markers make the contract visible in the prompt itself, so a malformed reply is obvious rather than subtly mis-parsed — and the fallback to Markdown stays honest instead of inventing fields.",
    },
    {
      kind: "figure",
      id: "surface",
      nav: "Surface",
      title: "Five systems, one *thread*",
      body: "Geocoding, vision analysis, and FEMA lookups all resolve before a reply appears. None of that is visible to someone who just uploaded a photo of a damaged roof.",
      figure: {
        src: "/work/huracan/dashboard.svg",
        alt: "Huracan dashboard with its inspection composer and saved-chat sidebar",
        width: 1200,
        height: 800,
        caption:
          "The chat thread is the whole interface. Everything the pipeline does has to arrive as one coherent message inside it.",
      },
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
