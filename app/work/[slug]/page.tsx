import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study/case-study";
import { getNextProject, getProject, getProjects } from "@/lib/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

// A case study created in the admin should appear without a redeploy.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  // Intentionally omit the title so every tab continues to read "Danny Kim".
  return { description: project.dek };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const nextProject = await getNextProject(project.slug);

  return <CaseStudy project={project} nextProject={nextProject ?? project} />;
}
