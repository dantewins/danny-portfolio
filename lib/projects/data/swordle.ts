import type { Project } from "@/lib/projects/types";

export const swordle = {
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
} satisfies Project;
