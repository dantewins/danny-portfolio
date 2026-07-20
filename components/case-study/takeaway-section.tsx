import { CaseStudyActions } from "@/components/case-study/case-study-actions";
import type { Project } from "@/lib/projects";

export function TakeawaySection({ project }: { project: Project }) {
  return (
    <section id="takeaway" className="mt-16 scroll-mt-28 sm:mt-20">
      <p className="font-raleway text-sm text-zinc-500">Takeaway</p>
      <blockquote className="mt-3 max-w-2xl font-merriweather text-xl leading-relaxed font-light text-zinc-800 italic sm:text-2xl">
        {project.takeaway}
      </blockquote>
      <CaseStudyActions project={project} />
    </section>
  );
}
