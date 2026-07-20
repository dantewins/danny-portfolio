import type { Project } from "@/lib/projects";

export type CaseNavItem = {
  id: string;
  label: string;
};

export function buildCaseNavItems(project: Project): CaseNavItem[] {
  return [
    { id: "overview", label: "Overview" },
    ...project.sections.map((section) => ({
      id: section.id,
      label: section.nav,
    })),
    { id: "how-it-works", label: "How it works" },
    { id: "takeaway", label: "Takeaway" },
  ];
}
