import { bunni } from "@/lib/projects/data/bunni";
import { expounder } from "@/lib/projects/data/expounder";
import { huracan } from "@/lib/projects/data/huracan";
import { scioly } from "@/lib/projects/data/scioly";
import { swordle } from "@/lib/projects/data/swordle";
import type { Project, ProjectSlug } from "@/lib/projects/types";

export type {
  CaseSection,
  Project,
  ProjectHero,
  ProjectSlug,
} from "@/lib/projects/types";

// This order drives both the homepage list and circular next-project links.
export const projects: Project[] = [
  swordle,
  scioly,
  huracan,
  bunni,
  expounder,
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
