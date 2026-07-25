import type { Project } from "@/lib/projects/types";

export const swordle = {
  slug: "swordle",
  title: "Swordle",
  category: "Realtime learning game",
  shortDescription:
    "A six-attempt SAT vocabulary game with persistent solo rounds and realtime multiplayer matchmaking.",
  dek: "A Wordle-style SAT vocabulary game with solo rounds and realtime multiplayer. The real work was deciding which state the browser can own, and which state the server must authorize.",
  role: "Full-stack",
  icon: "Sword",
  featured: true,
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
  // Authored in the admin; empty means the hero image is shown instead.
  slides: [],
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
      kind: "code",
      id: "evaluator",
      nav: "The evaluator",
      title: "Repeated letters need *two* passes",
      body: "Scoring a guess in one pass looks fine until the secret word repeats a letter. Marking every matching letter as present double-counts it, so a single L in the answer lights up both Ls in the guess. The fix is to claim exact hits first and let the second pass spend only what's left.",
      code: {
        filename: "src/app/api/games/[id]/guess/route.ts",
        language: "ts",
        source: `const result: ("correct" | "present" | "absent")[] = Array(secret.length).fill("absent");
const secretCounts: Record<string, number> = {};

for (let i = 0; i < secret.length; i++) {
    if (guessUpper[i] === secret[i]) {
        result[i] = "correct";
    } else {
        secretCounts[secret[i]] = (secretCounts[secret[i]] || 0) + 1;
    }
}
for (let i = 0; i < guessUpper.length; i++) {
    const g = guessUpper[i];
    if (result[i] !== "correct" && secretCounts[g] > 0) {
        result[i] = "present";
        secretCounts[g]--;
    }
}`,
        href: "https://github.com/dantewins/swordle/blob/main/src/app/api/games/%5Bid%5D/guess/route.ts#L38-L54",
      },
      caption:
        "Pass one counts only the letters it did not place exactly; pass two decrements that budget as it marks letters present. Both passes run on the server, which returns colored positions during play and the answer itself only once the round is over.",
    },
    {
      kind: "figure",
      id: "modes",
      nav: "Modes",
      title: "Two modes, one *board*",
      body: "Solo and multiplayer are chosen up front, but they are not two games. The board, the keyboard, and the evaluator are shared; what changes is who else is subscribed to the round.",
      figure: {
        src: "/work/swordle/modes.svg",
        alt: "Swordle mode picker offering solo and multiplayer rounds",
        width: 1440,
        height: 930,
        caption:
          "Picking a mode decides whether a game row gets a second player, not which board component renders.",
      },
    },
    {
      id: "matchmaking",
      nav: "Matchmaking",
      title: "Matchmaking over *presence*",
      body: "A Supabase Realtime presence channel is the waiting room: players announce themselves and the queue proposes a match over broadcast, while the join API stays authoritative so a presence event alone can't seat anyone. Once matched, both boards subscribe to row changes instead of polling.",
    },
    {
      kind: "comparison",
      id: "playtesting",
      nav: "Playtesting",
      title: "Mobile playtests found the *real* bugs",
      body: "Touch support was tested against live games, not treated as a CSS pass. The multiplayer layout that worked on a laptop was the first thing to break on a phone.",
      before: {
        label: "Two boards, side by side",
        caption:
          "Mirroring the desktop layout meant neither board had room to be legible, and the letter grid was the part that had to stay readable.",
      },
      after: {
        label: "One board, opponent in a popover",
        caption:
          "The player's own grid gets the full width. Input locks while a guess saves or an opponent is missing, and keyboard colors derive from persisted results rather than local state.",
      },
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
