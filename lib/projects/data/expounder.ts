import type { Project } from "@/lib/projects/types";

export const expounder = {
  slug: "expounder",
  title: "Expounder",
  category: "AI developer tool",
  shortDescription:
    "A repository explorer that ingests source files, retrieves relevant context, and generates a structured README with downloadable history.",
  dek: "A repository explorer that reads your codebase and writes the README: retrieval pipeline first, prompt second.",
  role: "Full-stack + AI",
  icon: "note",
  published: "July 2025",
  stack: ["Next.js 15", "TypeScript", "Clerk", "Octokit", "OpenAI"],
  repository: "https://github.com/dantewins/expounder",
  live: "https://expounder.vercel.app",
  hero: {
    src: "/work/expounder/preview.jpg",
    alt: "Expounder landing page with its product pitch",
    width: 1280,
    height: 720,
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
      kind: "code",
      id: "bounding",
      nav: "Bounding",
      title: "Three constants do most of the *work*",
      body: "The interesting part of ingestion is not the model call, it's the three limits in front of it. A binary filter, a concurrency ceiling, and a fixed slice size are what keep a large repository from becoming an unbounded fan-out of uploads.",
      code: {
        filename: "src/app/api/core/expound/route.ts",
        language: "ts",
        source: `const CONCURRENCY = 6;
const CHUNK_BYTES = 80_000;
const BINARY_RE = /\\.(png|jpe?g|gif|svg|ico|pdf|zip|tar|gz|mp[34]|mov|avi|woff2?)$/i;

function* chunk(text: string) {
    let offset = 0;
    while (offset < text.length) {
        yield text.slice(offset, offset + CHUNK_BYTES);
        offset += CHUNK_BYTES;
    }
}

const blobs = tree.filter((n) => n.type === "blob" && !BINARY_RE.test(n.path));
const limiter = pLimit(CONCURRENCY);`,
        href: "https://github.com/dantewins/expounder/blob/main/src/app/api/core/expound/route.ts#L17-L54",
      },
      caption:
        "Binaries are dropped before anything is fetched, blobs move six at a time through p-limit, and a generator slices each file rather than holding every part in memory. A bigger repo gets slower, not fatal.",
    },
    {
      kind: "decision",
      id: "typed-blocks",
      nav: "Typed blocks",
      title: "Asking for *JSON* instead of Markdown",
      body: "The model has to produce a README, so the obvious move is to ask it for Markdown and write the string to a file.",
      considered:
        "Have the model return finished Markdown and save the response directly",
      shipped:
        "Have the model return typed blocks, validate them, then render Markdown locally",
      why: "Markdown straight from a model is unvalidatable — you cannot tell a malformed heading from a stylistic choice, and there is nothing to reject. Typed blocks either parse or they don't, and rendering happens in code I control, so the file always has the same shape.",
    },
    {
      id: "output",
      nav: "Output",
      title: "Drafts that *survive* the browser",
      body: "The model returns typed blocks, not Markdown; a renderer converts validated JSON into README.md for immediate download. Each generation also archives to Dropbox, which is deliberately non-fatal when it fails.",
    },
    {
      kind: "figure",
      id: "surface",
      nav: "Surface",
      title: "A pipeline with one *button*",
      body: "Eight stages run between picking a repository and downloading a README. The interface deliberately shows none of them.",
      figure: {
        src: "/work/expounder/landing.svg",
        alt: "Expounder landing page presenting the repository-to-README pitch",
        width: 1200,
        height: 800,
        caption:
          "The pitch is a single action. The retrieval pipeline behind it is the part that makes the output worth downloading.",
      },
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
} satisfies Project;
