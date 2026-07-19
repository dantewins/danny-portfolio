export type ProjectSlug =
  | "swordle"
  | "scioly"
  | "huracan"
  | "bunni"
  | "expounder";

export type TechnicalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  flow?: string[];
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  shortDescription: string;
  intro: string;
  role: string;
  format: string;
  stack: string[];
  published: string;
  readTime: string;
  repository?: string;
  live?: string;
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
  sections: TechnicalSection[];
  takeaway: string;
};

export const projects: Project[] = [
  {
    slug: "swordle",
    title: "Swordle",
    category: "Realtime learning game",
    shortDescription:
      "A six-attempt SAT vocabulary game with persistent solo rounds and realtime multiplayer matchmaking.",
    intro:
      "Swordle began with a compact Wordle-style loop, then grew into a stateful multiplayer system. The interesting engineering work was not drawing the grid; it was deciding which state the browser could own, which state the server had to authorize, and how two players could see the same match advance without drifting apart.",
    role: "Full-stack product engineering",
    format: "Technical build log",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase Auth",
      "Supabase Postgres",
      "Supabase Realtime",
      "Framer Motion",
    ],
    published: "July 2025",
    readTime: "7 min read",
    repository: "https://github.com/dantewins/swordle",
    live: "https://swordle-mauve.vercel.app",
    media: {
      src: "https://raw.githubusercontent.com/dantewins/swordle/main/public/logo.jpg",
      alt: "Swordle logo artwork",
      caption:
        "Swordle's repository includes identity artwork; the game itself is rendered as a responsive React interface.",
    },
    sections: [
      {
        id: "authoritative-game-state",
        title: "Keeping game rules behind an authenticated API boundary",
        paragraphs: [
          "I built the client in the Next.js App Router, but I kept word selection, guess evaluation, player outcomes, and game completion inside server routes. The browser receives the definition, part of speech, word length, and its own guess history; it does not receive the secret until the game has completed. Every game read and mutation also checks the authenticated Supabase user and verifies that the user is a participant.",
          "The server uses a user-scoped Supabase client for authentication and authorization checks, then a service client for the database work that must happen after those checks. That separation matters because the service key can bypass row-level restrictions. In practice, the API route becomes the narrow trusted boundary between an interactive React board and the games, words, guesses, and game_players tables.",
        ],
        bullets: [
          "A database function selects a random vocabulary word when a game is created.",
          "The game endpoint reveals the definition and part of speech while withholding the answer.",
          "Guess and join routes reject users who do not belong to the requested game.",
          "Completed outcomes feed the wins, losses, streak, and leaderboard views.",
        ],
        flow: [
          "React game board",
          "Authenticated Next.js API route",
          "Supabase Postgres game state",
          "Sanitized result returned to the player",
        ],
      },
      {
        id: "correct-wordle-evaluation",
        title: "Making repeated letters and multiplayer outcomes deterministic",
        paragraphs: [
          "The guess evaluator uses two passes. The first marks exact-position matches and counts only the unmatched letters remaining in the secret. The second marks a guessed letter as present only while that remaining count is above zero. This avoids the common Wordle clone bug where one letter in the answer can incorrectly turn several duplicate guesses yellow.",
          "The harder state transition is the end of a multiplayer game. A player finishes after a correct answer or six attempts, and the route records that player's outcome before checking whether any opponent is still pending. A win updates pending opponents, while an additional winner can convert the result to a draw. Only after no pending players remain does the game move to completed and reveal the answer with refreshed statistics.",
        ],
        bullets: [
          "Guess results are stored as correct, present, or absent for each character.",
          "The six-attempt limit is enforced from persisted guesses, not a browser counter.",
          "The final response is derived from the refreshed game row after outcome updates.",
        ],
      },
      {
        id: "realtime-matchmaking",
        title: "Coordinating a match with presence, broadcasts, and database events",
        paragraphs: [
          "I used a Supabase Realtime presence channel as the waiting room. Players announce that they are available, the queue chooses a compatible peer, and broadcast events carry the proposed game and join acknowledgement. The join API remains authoritative, so a presence event alone cannot place an arbitrary user into a match or allow the same user to join multiple active multiplayer games.",
          "Once both players are in the game, the client subscribes to changes for the game and guess rows. That lets each board update without polling and makes the opponent preview possible. The repository history shows how much iteration this coordination required: the queue arrived after the solo game, followed by route refactoring, a duplicate-fetch fix for rejoining, and a final fix for a completion dialog that could reopen during multiplayer.",
        ],
        flow: [
          "Presence channel finds waiting players",
          "Broadcast proposes a match",
          "Join API validates and persists both players",
          "Database subscriptions keep both boards current",
        ],
      },
      {
        id: "mobile-playtesting",
        title: "Using mobile playtests to expose state and input bugs",
        paragraphs: [
          "Mobile support was tested against the actual game rather than treated as a final CSS pass. The commit history records two separate mobile gameplay fixes discovered by playtesters. The current board is bounded by the viewport, scales its columns from the active word length, and pairs the physical keyboard listener with a large on-screen keyboard so the same state machine serves desktop and touch input.",
          "The surrounding interface also adapts: navigation has a dedicated mobile menu, the opponent state lives in a small popover instead of a second full board, and loading or waiting states block input until the round is safe to play. Daily Challenge still appears as a disabled Coming soon mode, so I keep it out of the implemented feature set even though older landing copy describes it more confidently.",
        ],
        bullets: [
          "Input is disabled while a guess is saving, a board is loading, or an opponent has not joined.",
          "Keyboard colors are derived from persisted guess results rather than optimistic styling.",
          "Win confetti is guarded by a ref so a rerender does not fire it repeatedly.",
        ],
      },
    ],
    takeaway:
      "Swordle's useful lesson is that realtime UI is mostly state ownership. Presence can make a queue feel immediate, but authenticated routes and persisted outcomes still have to decide what is true.",
  },
  {
    slug: "scioly",
    title: "Scioly",
    category: "Club operations platform",
    shortDescription:
      "A public Science Olympiad workspace that presents registration, role-aware operations, roster management, and season tracking as one product.",
    intro:
      "Scioly is different from the other projects in this collection because its source repository is not public. I can document the contract exposed by the deployed application—the pages, forms, client endpoints, responsive behavior, and product claims—but I cannot responsibly describe an unseen database or backend as implemented fact.",
    role: "Full-stack product implementation",
    format: "Public-system technical review",
    stack: [
      "Next.js",
      "React",
      "Vercel",
      "Utility-first CSS",
      "Tabler Icons",
      "Geist",
      "Instrument Serif",
    ],
    published: "2026 public build",
    readTime: "6 min read",
    live: "https://scioly-ten.vercel.app/",
    media: {
      src: "https://scioly-ten.vercel.app/showcase-dark.png",
      alt: "Scioly dashboard preview in dark mode",
      caption:
        "The deployed site provides this 3840 by 1916 dashboard preview as its primary product image.",
    },
    sections: [
      {
        id: "observable-architecture",
        title: "Documenting only the architecture the deployment exposes",
        paragraphs: [
          "The production response identifies a Next.js application hosted on Vercel. Server-rendered HTML includes React flight data, responsive utility classes, an AuthProvider client boundary, and page-specific bundles. The public registration and sign-in forms submit to /api/auth/register and /api/auth/login, which confirms an application-owned API surface without revealing how credentials or sessions are implemented behind it.",
          "That is the limit of the verified architecture. I did not find a public repository under the supplied GitHub account, and the client bundle does not establish a database vendor, ORM, password algorithm, or server authorization model. Those details are intentionally absent from the stack rather than filled in from convention.",
        ],
        flow: [
          "Server-rendered Next.js page on Vercel",
          "Client registration or sign-in form",
          "Public /api/auth endpoint",
          "Backend implementation not publicly verifiable",
        ],
      },
      {
        id: "public-product-contract",
        title: "Treating the landing page as a product contract, not backend proof",
        paragraphs: [
          "The deployed landing page frames the system as a replacement for spreadsheets, group chats, and lost email across applications, rosters, hours, dues, events, and competitions. It presents three major operational views: tournament telemetry, roster administration, and historical season results. It also markets assessments, conflict-aware event assignments, invoices, and role-based access for coaches, captains, and members.",
          "Those are verified public claims and visible interface examples, but they are not equivalent to verified persistence or business logic. In this article I describe them as marketed behavior. I do not claim that conflict detection, invoice delivery, percentile calculations, or permission enforcement were inspected end to end because the public surface does not make that possible.",
        ],
        bullets: [
          "Telemetry is presented with per-event rankings, trends, and annotations.",
          "Roster tooling is presented with application review and bulk event assignment.",
          "History is presented as season and per-event placement records.",
          "The site markets unified relational data and role-specific access.",
        ],
      },
      {
        id: "workspace-onboarding",
        title: "Using club registration to establish the visible tenancy boundary",
        paragraphs: [
          "The public registration flow asks for club name, school name, the primary administrator's name, an email address, a school email domain, and a password. Its copy says that members will need an address ending in that school domain. Even without backend source, the form reveals the intended top-level model: an administrator creates a club workspace and establishes the domain used to admit its members.",
          "The sign-in screen then narrows the interaction to school email and password. This is a clearer operational boundary than a generic consumer account, but the implementation questions remain open: domain verification, password storage, session rotation, cross-club membership, and server-side role enforcement cannot be audited from the deployment. Those are the first areas I would verify before calling the visible RBAC claims production guarantees.",
        ],
        flow: [
          "Primary administrator registers a club",
          "Club records a school email domain",
          "Members sign in with school email",
          "Role and workspace enforcement are not public",
        ],
      },
      {
        id: "responsive-surface-and-evidence",
        title: "Building a responsive public surface while preserving evidence boundaries",
        paragraphs: [
          "The public pages use explicit small- and large-screen breakpoints, flexible call-to-action groups, a dashboard image with a stable aspect ratio, and registration cards constrained inside full-height layouts. On narrow screens, the four product stats wrap into two columns and the feature sections collapse from paired text-and-preview layouts into a single reading order. These behaviors are visible in the delivered HTML and CSS classes.",
          "The dashboard screenshot is the strongest product artifact available, but it is still a preview supplied by the marketing page. There are no public commit messages, incident notes, tests, performance reports, or mobile application screens to support a deeper reliability story. Rather than invent a debugging narrative, I leave backend reliability and the hardest internal implementation issue explicitly undocumented until source or engineering notes are available.",
        ],
        bullets: [
          "The deployment is live and served by Vercel with Next.js response metadata.",
          "Registration and sign-in pages are independently reachable and responsive.",
          "The supplied dashboard preview is 3840 by 1916 pixels.",
          "Backend reliability, data modeling, and authorization remain unverified.",
        ],
      },
    ],
    takeaway:
      "A public interface can establish a strong product contract without exposing its implementation. The technically honest case study separates what users can see from what the available evidence cannot prove.",
  },
  {
    slug: "huracan",
    title: "Huracan",
    category: "Multimodal recovery assistant",
    shortDescription:
      "A chat-based hurricane recovery tool that combines damage-image analysis, repair guidance, location context, and FEMA data.",
    intro:
      "Huracan routes a conversation through several external systems: image storage, computer vision, a generative model, geocoding, and FEMA's public API. The main technical challenge was turning that chain into one understandable response while preserving authentication, conversation history, and clear failure boundaries.",
    role: "Full-stack and AI integration engineering",
    format: "Multimodal system walkthrough",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Prisma",
      "Postgres",
      "Azure AI Vision",
      "Gemini 2.5 Flash",
      "FEMA Open API",
      "OpenStreetMap Nominatim",
    ],
    published: "October 2025",
    readTime: "8 min read",
    repository: "https://github.com/dantewins/huracan",
    live: "https://huracan-eosin.vercel.app",
    sections: [
      {
        id: "multimodal-request-pipeline",
        title: "Composing the image, language, location, and aid pipeline",
        paragraphs: [
          "A user message can contain text and multiple uploaded image URLs. Huracan saves that message first, then its prompt route loads the ordered conversation, asks Gemini to extract a possible address, and geocodes that address through Nominatim. Each image is analyzed by Azure AI Vision for captions, dense captions, objects, tags, and text before Gemini turns those signals into repair suggestions.",
          "The same request queries FEMA's DisasterDeclarationsSummaries endpoint for recent hurricane declarations, optionally filtered by the geocoded state. A final Gemini call receives the conversation, raw image analyses, generated damage summaries, repair suggestions, and FEMA explanation. That composition step produces the assistant reply that is saved back to the inspection thread.",
        ],
        flow: [
          "Text and images saved to an inspection",
          "Address extraction and Nominatim geocoding",
          "Azure Vision analysis for each image",
          "Gemini repair and FEMA explanations",
          "Final assistant response persisted to Postgres",
        ],
      },
      {
        id: "normalizing-model-output",
        title: "Turning model output into a stable repair interface",
        paragraphs: [
          "The hardest presentation problem was that a useful repair response contains several different data shapes: an observation, a priority, a description, an estimated cost, an estimated time, and required resources. The Gemini prompt asks for explicit SOLUTION, PRIORITY, DESCRIPTION, COST, TIME, and RESOURCES markers. A parser then converts those markers into typed solution objects instead of rendering one undifferentiated generated paragraph.",
          "The React message list renders those objects as separate cards and falls back to Markdown when the format is not present. This is a pragmatic contract rather than a guarantee: the parser defaults an unknown priority to medium and only retains blocks with both a title and description. The interface also states that the AI can make mistakes; the repository contains no professional validation or accuracy study, so the output remains guidance rather than a verified inspection.",
        ],
        bullets: [
          "Azure results are reduced into visible damage and structural keywords.",
          "Repair cards preserve priority, cost, time, and materials as separate fields.",
          "Markdown remains available for conversational text around the structured cards.",
          "No public evidence supports claims of diagnostic or cost-estimate accuracy.",
        ],
      },
      {
        id: "session-and-history-boundaries",
        title: "Protecting saved inspections with explicit ownership checks",
        paragraphs: [
          "Huracan implements its own email-and-password session layer. Passwords are hashed with bcrypt, sessions receive UUIDs, and the database stores a seven-day expiry. The session ID is written to an HTTP-only cookie, with the secure flag enabled in production. Prisma models users, sessions, inspections, and ordered messages, including the external URLs of uploaded images.",
          "Every message read and write first resolves the session, loads the inspection, and compares its userId with the active user. That explicit ownership check prevents a valid account from reading another inspection merely by guessing its route ID. On the client, new messages appear optimistically, failed sends retain an error state, and an AbortController lets the user cancel the request instead of leaving the interface stuck in a sending state.",
        ],
        flow: [
          "HTTP-only session cookie",
          "Prisma session lookup and expiry check",
          "Inspection ownership verification",
          "Ordered message read or write",
        ],
      },
      {
        id: "responsive-chat-and-debugging",
        title: "Refining a long-running chat workflow across screen sizes",
        paragraphs: [
          "The interface uses a collapsible sidebar for saved inspections and a single-column chat surface for the active thread. User images wrap into selectable previews, generated content is limited to a readable width, and the input component accepts touch-driven image selection as well as text. The repository also includes a mobile breakpoint hook and sheet-based sidebar primitives rather than forcing the desktop navigation beside the conversation.",
          "The commit sequence shows the reliability work more clearly than the boilerplate README: saved chats and messages were modularized first, then an abort controller was added, followed by several bug fixes, image handling changes, and a MessageList correction. Some polish debt remains visible—the page metadata still says Congressional App Challenge, while the product name appears as Huracán and the AI prompt uses Hurcan—but the deployed chat path itself is live.",
        ],
        bullets: [
          "Conversation titles are generated after the first exchange and refreshed in the sidebar.",
          "A modal opens uploaded images without navigating away from the thread.",
          "Loading, thinking, failed-send, and cancellation states are represented separately.",
        ],
      },
    ],
    takeaway:
      "Huracan shows why an AI feature is an integration problem before it is a prompt problem. Authentication, ownership, external API failure, output normalization, and uncertainty all shape whether the generated answer is usable.",
  },
  {
    slug: "bunni",
    title: "Bunni",
    category: "Academic workflow integration",
    shortDescription:
      "A Notion-backed academic calendar with timezone-aware day views and a prototype Canvas synchronization pipeline.",
    intro:
      "Bunni's current architecture is more interesting than its README suggests. It moved away from Supabase, made Notion OAuth the identity boundary, and added a scheduled Canvas-to-Notion pipeline. The implementation history is largely a story about integration reliability: token refresh, schema validation, date normalization, idempotent updates, and the difference between a general product and a school-specific prototype.",
    role: "Full-stack integration engineering",
    format: "Integration engineering log",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Prisma",
      "Postgres",
      "Notion API",
      "Notion OAuth",
      "JWT",
      "Gemini 2.5 Flash Lite",
      "Vercel Cron",
    ],
    published: "August 2025",
    readTime: "8 min read",
    live: "https://bunni-nine.vercel.app",
    sections: [
      {
        id: "notion-first-architecture",
        title: "Making Notion OAuth the account and data boundary",
        paragraphs: [
          "The current application does not use the Supabase architecture described in its README. A Notion OAuth callback exchanges the authorization code, upserts a user by Notion user ID, stores the access and refresh tokens in a Prisma-backed NotionConnection, signs a seven-day JWT, and places that token in an HTTP-only app_session cookie. Protected pages and API routes resolve the same user ID from that session.",
          "After authorization, the sync route validates the submitted calendar database and its relationship to the selected parent page. It also checks the required Notion properties and the related Subjects database before persisting IDs. That validation makes a loosely structured workspace usable as an application dependency: failures surface during setup rather than later as empty calendar rows.",
        ],
        flow: [
          "Notion OAuth authorization",
          "User and connection upsert in Postgres",
          "HTTP-only JWT session",
          "Validated Notion database IDs",
          "Calendar and task API routes",
        ],
      },
      {
        id: "timezone-debugging",
        title: "Fixing the day-shift bug instead of patching the calendar UI",
        paragraphs: [
          "Timezone handling was the hardest documented reliability issue. The commit history contains a timezone fix followed by a sequence of day-shift fixes and the eventual extraction of lib/date.ts. The problem is that Notion dates can arrive as date-only values, timestamps with offsets, or floating timestamps. Comparing all of them with the server's local Date defaults moves some assignments to the previous or next day.",
          "The extracted date layer creates a YYYY-MM-DD key in an explicit timezone, computes the offset on the target date, and builds a Notion range from local midnight to the next local midnight. It also reparses floating timestamps as local time and performs a final application-side day check. The calendar endpoint combines the main academic database with a Tasks database only after both sets have passed the same day normalization.",
        ],
        bullets: [
          "Date-only values are compared as calendar keys rather than UTC instants.",
          "Offset-aware timestamps are converted into the selected timezone before comparison.",
          "The query range accounts for offset changes between consecutive dates.",
          "Client requests pass the active browser timezone to the calendar API.",
        ],
      },
      {
        id: "canvas-sync-pipeline",
        title: "Building an idempotent Canvas-to-Notion synchronization pass",
        paragraphs: [
          "The Canvas path gathers active courses and planner items, filters unfinished assignments into a bounded date window, and resolves each assignment's course and full detail. Gemini Flash Lite classifies the item as an assignment or assessment and cleans its title. The resulting Notion page stores the due date, subject relation, Canvas ID, type, source link, completion state, and a hash of the source content.",
          "That hash is the reliability mechanism: an unchanged source item can skip another model call, while changed items update only the properties that differ. After processing open assignments, the sync marks Notion items complete when their Canvas IDs no longer appear in the unfinished set. A Vercel cron invokes this pipeline daily and records success or failure per user rather than stopping the full batch on one exception.",
        ],
        flow: [
          "Canvas courses and planner items",
          "Date and completion filtering",
          "Gemini classification when source hash changes",
          "Notion create or property-level update",
          "Daily Vercel cron reconciliation",
        ],
      },
      {
        id: "prototype-boundaries",
        title: "Separating the working calendar from prototype-only claims",
        paragraphs: [
          "The deployed interface implements a week selector and a focused list for the chosen day. On smaller screens, the date controls and task cards stack instead of compressing assignments into tiny calendar cells. Users can create a quick task in Notion from the selected date, and empty or unsynchronized states redirect toward the setup flow with an explicit message.",
          "I do not describe a finished monthly view because the current code does not contain one, even though older landing copy promises weekly and monthly layouts. I also treat Canvas as a prototype: the connection model exists, but the active fetch code is tied to a specific Canvas instance rather than a completed per-user setup path. The public README was generated with Expounder before Supabase was removed, which explains—but does not correct—its stale architecture section.",
        ],
        bullets: [
          "Notion access tokens are refreshed when expired and retried after authorization failures.",
          "Calendar data is requested dynamically rather than cached as static page output.",
          "The current product artifact is a logo; no verified calendar screenshot ships with the project.",
          "Monthly view and general Canvas onboarding remain outside the verified implementation.",
        ],
      },
    ],
    takeaway:
      "Bunni's strongest engineering story is not a calendar component. It is the work required to make two external data models agree about identity, schema, dates, updates, and failure.",
  },
  {
    slug: "expounder",
    title: "Expounder",
    category: "AI developer tool",
    shortDescription:
      "A repository explorer that ingests source files, retrieves relevant context, and generates a structured README with downloadable history.",
    intro:
      "Expounder turns an authenticated GitHub repository into a grounded README draft. Its core is a retrieval pipeline rather than a single oversized prompt: enumerate the repository, preview files in the UI, upload text in bounded chunks, search a vector store, validate structured output, convert it to Markdown, and preserve a history outside the browser.",
    role: "Full-stack and AI workflow engineering",
    format: "Retrieval pipeline deep dive",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Clerk",
      "GitHub OAuth",
      "Octokit",
      "OpenAI Responses API",
      "OpenAI File Search",
      "Dropbox API",
    ],
    published: "July 2025",
    readTime: "8 min read",
    repository: "https://github.com/dantewins/expounder",
    media: {
      src: "https://raw.githubusercontent.com/dantewins/expounder/main/public/hero.png",
      alt: "Expounder rocket illustration",
      caption:
        "The repository's 2000 by 2000 rocket illustration accompanies the public landing page.",
    },
    sections: [
      {
        id: "dual-authentication-boundary",
        title: "Separating application identity from repository authorization",
        paragraphs: [
          "Clerk authenticates the person using Expounder, while a separate GitHub OAuth flow grants repository access. The GitHub callback validates a state cookie, exchanges the code, and stores the resulting token in an HTTP-only, same-site cookie. That token is then used by Octokit to list up to one hundred repositories, including private ones allowed by the requested repo scope.",
          "The dashboard resolves the selected repository's default branch, requests its recursive Git tree, builds a nested browser tree, and exposes raw file previews through a server route. Keeping GitHub access on the server means the React client works with repository metadata and file text without receiving the OAuth token itself.",
        ],
        flow: [
          "Clerk user session",
          "GitHub OAuth with state validation",
          "HTTP-only GitHub token cookie",
          "Octokit repository tree and file routes",
          "Read-only browser preview",
        ],
      },
      {
        id: "bounded-repository-ingestion",
        title: "Controlling repository ingestion before asking the model to write",
        paragraphs: [
          "The hardest scaling problem was converting an arbitrary repository into useful model context without sending one enormous request. The expound route requests the raw tree, removes common binary formats, fetches blobs with a concurrency limit of six, and splits each text file into 80,000-character parts. Each part is uploaded as an OpenAI assistant file before all file IDs are attached to a new vector store.",
          "The Responses API runs o4-mini with high reasoning effort and file_search against that vector store. The prompt explicitly says not to trust an existing README or repository description because either may be stale. Instead, the model must use the source and omit sections it cannot support. A structured schema constrains the response to README blocks before any Markdown is produced.",
        ],
        bullets: [
          "Binary images, archives, media, fonts, and PDFs are excluded from text ingestion.",
          "Concurrency is bounded with p-limit rather than launching every GitHub and OpenAI request at once.",
          "Large source files are divided into deterministic numbered text parts.",
          "File search gives the model repository evidence without embedding the entire codebase in one prompt.",
        ],
      },
      {
        id: "structured-output-and-history",
        title: "Validating the draft, exporting Markdown, and preserving history",
        paragraphs: [
          "The model does not return final Markdown directly. It returns typed blocks for headings, paragraphs, lists, code, images, and tables. The route finds the output_text item, parses its JSON, requires the blocks field, and passes those blocks through a dedicated Markdown renderer. The browser immediately downloads README.md and can download the same generated blocks again without rerunning the model.",
          "Expounder also stores the Markdown in a user-specific Dropbox path. The navigation can list prior generations, open a read-only file, download it, or delete it. Dropbox failure is deliberately non-fatal to generation: the route logs the failed archive but still returns the README. Later commit history shows refresh-token support being added after expiring Dropbox access tokens exposed that reliability gap.",
        ],
        flow: [
          "Responses API structured blocks",
          "JSON validation",
          "Block-to-Markdown renderer",
          "Immediate browser download",
          "Optional Dropbox-backed history",
        ],
      },
      {
        id: "product-drift-and-responsive-workspace",
        title: "Debugging the workflow while the product definition changed",
        paragraphs: [
          "The repository history records repeated file-tree cleanup, middleware cleanup, build and lint fixes, a switch from an edge function to a Node.js function, and a later ChatGPT-style redesign with saved history. The active workspace responds to its content: selecting a file changes the layout from one column to two at medium widths, while narrow screens keep the tree and preview in a readable sequence and expose navigation through a dedicated mobile menu.",
          "The remaining product drift is explicit. The landing page still promises drag-and-drop changelogs and release notes for Notion, Markdown, and X, while the active dashboard generates READMEs from repositories. An unused Atlas route reflects that earlier direction. The public Vercel deployment is currently paused, so the repository—not the live URL—is the verifiable artifact for this implementation.",
        ],
        bullets: [
          "The generation route opts into the Node.js runtime and allows a five-minute duration.",
          "A full-screen loading state sets expectations that repository ingestion may take time.",
          "Read-only previews limit file height and scroll independently on smaller displays.",
          "Current product copy should be aligned with the implemented README workflow before relaunch.",
        ],
      },
    ],
    takeaway:
      "Expounder works because generation is only one stage. Repository authorization, bounded ingestion, retrieval, schema validation, deterministic rendering, and recoverable storage make the output much more dependable than a one-shot prompt.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
