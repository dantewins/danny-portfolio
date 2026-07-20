export type ProjectSlug =
  | "swordle"
  | "scioly"
  | "huracan"
  | "bunni"
  | "expounder";

export type CaseSection = {
  id: string;
  nav: string;
  // Words wrapped in *asterisks* render in italic Merriweather, matching the
  // serif-accent mixing used across the main page.
  title: string;
  body: string;
  bullets?: string[];
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
  hero: { src: string; alt: string; width: number; height: number };
  sections: CaseSection[];
  flow: string[];
  takeaway: string;
};

export const projects: Project[] = [
  {
    slug: "swordle",
    title: "Swordle",
    category: "Realtime learning game",
    shortDescription:
      "A six-attempt SAT vocabulary game with persistent solo rounds and realtime multiplayer matchmaking.",
    dek: "A Wordle-style SAT vocabulary game with solo rounds and realtime multiplayer. The real work was deciding which state the browser can own, and which state the server must authorize.",
    role: "Full-stack",
    published: "July 2025",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Supabase"],
    repository: "https://github.com/dantewins/swordle",
    live: "https://swordle-mauve.vercel.app",
    hero: {
      src: "/work/swordle/landing.svg",
      alt: "Swordle landing page with its vocabulary pitch and letter-grid motif",
      width: 1440,
      height: 930,
    },
    sections: [
      {
        id: "server-truth",
        nav: "Server truth",
        title: "The *rules* live behind the API",
        body: "Word selection, guess evaluation, and outcomes run in authenticated server routes. The browser gets the definition and its own guesses, never the secret word, and every mutation verifies the player belongs to the game.",
        bullets: [
          "A two-pass evaluator handles repeated letters correctly",
          "The six-attempt limit is enforced from persisted guesses, not a client counter",
          "Completed games feed streaks and the leaderboard",
        ],
      },
      {
        id: "matchmaking",
        nav: "Matchmaking",
        title: "Matchmaking over *presence*",
        body: "A Supabase Realtime presence channel is the waiting room: players announce themselves and the queue proposes a match over broadcast, while the join API stays authoritative so a presence event alone can't seat anyone. Once matched, both boards subscribe to row changes instead of polling.",
      },
      {
        id: "playtesting",
        nav: "Playtesting",
        title: "Mobile playtests found the *real* bugs",
        body: "Touch support was tested against live games, not treated as a CSS pass. Input locks while a guess saves or an opponent is missing, keyboard colors derive from persisted results, and the opponent lives in a popover instead of a second board.",
      },
    ],
    flow: [
      "Presence channel finds waiting players",
      "Broadcast proposes a match",
      "Join API validates both players",
      "Row subscriptions keep boards in sync",
    ],
    takeaway:
      "Realtime UI is mostly state ownership. Presence makes a queue feel instant, but authenticated routes still decide what's true.",
  },
  {
    slug: "scioly",
    title: "Scioly",
    category: "Club operations platform",
    shortDescription:
      "A public Science Olympiad workspace that presents registration, role-aware operations, roster management, and season tracking as one product.",
    dek: "A platform for running a Science Olympiad club: registration, rosters, hours, dues, and competition history in one place. The repo is private, so this study documents what the deployed product exposes.",
    role: "Full-stack",
    published: "2026",
    stack: ["Next.js", "React", "Vercel"],
    live: "https://scioly-ten.vercel.app/",
    hero: {
      src: "/work/scioly/landing.svg",
      alt: "Scioly landing page with a dark dashboard preview",
      width: 1440,
      height: 930,
    },
    sections: [
      {
        id: "contract",
        nav: "The contract",
        title: "The landing page is a *contract*",
        body: "The public build presents three operational views: tournament telemetry, roster administration, and season history, plus assessments, invoices, and role-based access. This study documents them as the product's public claims rather than dressing them up as audited internals.",
      },
      {
        id: "tenancy",
        nav: "Tenancy",
        title: "Registration reveals the *tenancy* model",
        body: "An administrator registers a club with a school email domain; members sign in with addresses on that domain. The form alone establishes the workspace boundary, even with the backend unseen.",
      },
      {
        id: "evidence",
        nav: "Evidence",
        title: "Saying only what the *evidence* supports",
        body: "The deployment verifies Next.js on Vercel, real auth endpoints, and a responsive public surface. Database, sessions, and role enforcement stay explicitly undocumented; honesty is part of the engineering.",
        bullets: [
          "Registration and sign-in submit to application-owned /api/auth routes",
          "Public pages adapt cleanly from phone to desktop widths",
          "Backend claims are labeled as marketed behavior, not verified fact",
        ],
      },
    ],
    flow: [
      "Server-rendered Next.js page on Vercel",
      "Registration or sign-in form",
      "Public /api/auth endpoint",
      "Backend stays private by design",
    ],
    takeaway:
      "A public surface can prove a product contract without exposing implementation. An honest case study keeps the two separate.",
  },
  {
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
      src: "/work/huracan/dashboard.svg",
      alt: "Huracan dashboard with its inspection composer and saved-chat sidebar",
      width: 1200,
      height: 800,
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
  },
  {
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
      src: "/work/bunni/landing.svg",
      alt: "Bunni landing page describing the Notion-backed calendar workflow",
      width: 1200,
      height: 800,
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
  },
  {
    slug: "expounder",
    title: "Expounder",
    category: "AI developer tool",
    shortDescription:
      "A repository explorer that ingests source files, retrieves relevant context, and generates a structured README with downloadable history.",
    dek: "A repository explorer that reads your codebase and writes the README: retrieval pipeline first, prompt second.",
    role: "Full-stack + AI",
    published: "July 2025",
    stack: ["Next.js 15", "TypeScript", "Clerk", "Octokit", "OpenAI"],
    repository: "https://github.com/dantewins/expounder",
    live: "https://expounder.vercel.app",
    hero: {
      src: "/work/expounder/landing.svg",
      alt: "Expounder landing page with its product pitch",
      width: 1200,
      height: 800,
    },
    sections: [
      {
        id: "two-identities",
        nav: "Two identities",
        title: "Identity and *authorization* stay separate",
        body: "Clerk signs in the person; a separate GitHub OAuth grant unlocks repositories. The token lives in an HTTP-only cookie and never reaches React, since the client browses trees and previews files through server routes.",
      },
      {
        id: "ingestion",
        nav: "Ingestion",
        title: "*Bounded* ingestion beats one big prompt",
        body: "The pipeline strips binaries, fetches blobs six at a time, splits files into 80,000-character parts, and attaches everything to a vector store. The model then writes from file search over actual source, with orders not to trust any stale README it finds.",
        bullets: [
          "Binary formats never enter text ingestion",
          "Concurrency is bounded with p-limit, not fired all at once",
          "File search grounds the draft without one enormous prompt",
        ],
      },
      {
        id: "output",
        nav: "Output",
        title: "Drafts that *survive* the browser",
        body: "The model returns typed blocks, not Markdown; a renderer converts validated JSON into README.md for immediate download. Each generation also archives to Dropbox, which is deliberately non-fatal when it fails.",
      },
    ],
    flow: [
      "Repo tree fetched and filtered",
      "Text chunked and uploaded",
      "File search grounds the model",
      "Typed blocks validated",
      "Markdown rendered and archived",
    ],
    takeaway:
      "Generation is one stage of eight. The pipeline around it is what makes the output dependable.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
