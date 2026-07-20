import type { Project } from "@/lib/projects/types";

export const scioly = {
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
} satisfies Project;
