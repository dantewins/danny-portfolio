import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { toProject } from "@/lib/projects/from-db";
import type { Project } from "@/lib/projects/types";

export type {
  CaseSection,
  CodeSection,
  ComparisonPane,
  ComparisonSection,
  DecisionSection,
  FigureSection,
  Project,
  ProjectHero,
  ProjectIcon,
  ProjectSlug,
  ProseSection,
} from "@/lib/projects/types";

export { PROJECT_ICONS } from "@/lib/projects/types";

export const CASE_STUDIES_TAG = "case-studies";

// Cached so the homepage and every case study route share one query per
// revalidation window. Saving in the admin busts the tag.
export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const rows = await prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    return rows.map(toProject);
  },
  ["case-studies"],
  { tags: [CASE_STUDIES_TAG] },
);

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getNextProject(slug: string) {
  const projects = await getProjects();
  if (projects.length === 0) return undefined;
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
