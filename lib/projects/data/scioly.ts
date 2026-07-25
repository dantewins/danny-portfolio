import type { Project } from "@/lib/projects/types";

export const scioly = {
  slug: "scioly",
  title: "Scioly",
  category: "Club operations platform",
  shortDescription:
    "A Science Olympiad workspace that presents registration, role-aware operations, roster management, and season tracking as one product.",
  dek: "A platform for running a Science Olympiad club: registration, rosters, hours, dues, and competition history in one place. The hard part is that no two clubs delegate authority the same way.",
  role: "Full-stack",
  icon: "flask",
  published: "2026",
  stack: ["Next.js 16", "React 19", "Prisma", "Postgres", "Zod", "Resend"],
  repository: "https://github.com/dantewins/scioly",
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
      title: "One product, three *operations*",
      body: "A club officer does not think in CRUD screens. They think in tournaments, people, and money. The application is organized the same way: tournament telemetry, roster administration, and season history, with assessments, invoices, and dues attached to whichever of the three they belong to.",
    },
    {
      kind: "figure",
      id: "features",
      nav: "Surface",
      title: "Breadth is the *feature*",
      body: "Clubs currently run on a spreadsheet, a group chat, and somebody's memory. Replacing that means covering all of it, because a tool that handles four of five jobs leaves the spreadsheet alive.",
      figure: {
        src: "/work/scioly/features.svg",
        alt: "Scioly feature overview showing rosters, hours, dues, and competition tracking",
        width: 1440,
        height: 930,
        caption:
          "Every area here is a place authority has to be delegated differently, which is what forced the permission model rather than a simple admin flag.",
      },
    },
    {
      kind: "code",
      id: "permissions",
      nav: "Permissions",
      title: "Roles are *composed*, not enumerated",
      body: "An officer might manage hours but not finances; a treasurer the reverse. Fixed roles cannot express that, and every club draws the line somewhere else. So roles are built from flags instead of chosen from a list.",
      code: {
        filename: "lib/permissions.ts",
        language: "ts",
        source: `export const PERMISSION_AREAS = [
  "members",
  "events",
  "competitions",
  "hours",
  "finances",
  "forms",
  "club_events",
  "practice",
  "roles",
  "club_settings",
] as const

export type PermissionArea = (typeof PERMISSION_AREAS)[number]

export type PermissionFlag =
  | \`view_\${PermissionArea}\`
  | \`create_\${PermissionArea}\`
  | \`edit_\${PermissionArea}\`
  | \`delete_\${PermissionArea}\`

// Flat permissions map stored on ClubRole and returned by getCurrentUser
export type PermissionMap = Partial<Record<PermissionFlag, boolean>>`,
        href: "https://github.com/dantewins/scioly/blob/main/lib/permissions.ts#L6-L28",
      },
      caption:
        "Ten areas times four verbs generates forty flags as a template literal type, so adding an area to the array extends the type rather than requiring forty new declarations. Unknown keys from the role editor get stripped before they are stored.",
    },
    {
      kind: "figure",
      id: "tenancy",
      nav: "Tenancy",
      title: "Registration draws the *boundary*",
      body: "An administrator registers a club against a school email domain, and members sign in with addresses on that domain. The workspace edge is decided at the moment of registration rather than administered afterwards.",
      figure: {
        src: "/work/scioly/register.svg",
        alt: "Scioly registration flow collecting club and school domain details",
        width: 1280,
        height: 720,
        caption:
          "Binding membership to a domain means the club never maintains an invite list, and a graduating student loses access when the school does it for them.",
      },
    },
    {
      id: "enforcement",
      nav: "Enforcement",
      title: "Checks that run where they *count*",
      body: "Flags in a database are decoration unless something enforces them. Sessions are JWTs signed with jose and carried in an HTTP-only cookie, passwords are bcrypt-hashed, and permission checks run in the API routes rather than in the components that render the buttons.",
      bullets: [
        "Session state is verified server-side on every protected route",
        "Role edits sanitize their input against the known flag set",
        "Hiding a button is treated as presentation, never as access control",
      ],
    },
  ],
  flow: [
    "Administrator registers a club and its email domain",
    "Members sign in with an address on that domain",
    "A composed role grants specific permission flags",
    "API routes verify the session and the flag",
  ],
  takeaway:
    "Fixed roles are a guess about how an organization delegates authority. Composable flags let each club be wrong in its own way without a schema change.",
} satisfies Project;
