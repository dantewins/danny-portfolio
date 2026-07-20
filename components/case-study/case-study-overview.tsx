import { ProjectHeroImage } from "@/components/case-study/project-hero-image";
import { ProjectTags } from "@/components/case-study/project-tags";
import type { Project } from "@/lib/projects";

export function CaseStudyOverview({ project }: { project: Project }) {
  return (
    <section id="overview" className="scroll-mt-28 pt-8 sm:pt-12">
      <p className="font-raleway text-sm font-light text-zinc-500 sm:text-base">
        {project.category}
      </p>
      <h1 className="mt-3 font-poppins text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
        {project.title}
      </h1>
      <p className="mt-6 max-w-2xl font-raleway text-lg leading-relaxed text-zinc-800 sm:text-xl">
        {project.dek}
      </p>
      <ProjectTags project={project} />
      <ProjectHeroImage hero={project.hero} />
    </section>
  );
}
