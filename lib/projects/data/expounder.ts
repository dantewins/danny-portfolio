import type { Project } from "@/lib/projects/types";

export const expounder = {
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
} satisfies Project;
