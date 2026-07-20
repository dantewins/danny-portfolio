import { ArticleSection } from "@/components/case-study/article-section";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { buildCaseNavItems } from "@/components/case-study/case-study-nav-items";
import { CaseStudyOverview } from "@/components/case-study/case-study-overview";
import { CaseStudyTopBar } from "@/components/case-study/case-study-top-bar";
import { NextCaseStudy } from "@/components/case-study/next-case-study";
import { ProcessSteps } from "@/components/case-study/process-steps";
import { TakeawaySection } from "@/components/case-study/takeaway-section";
import type { Project } from "@/lib/projects";

export function CaseStudy({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const navItems = buildCaseNavItems(project);

  return (
    <div className="min-h-screen antialiased">
      <div className="mx-auto max-w-5xl px-6">
        <CaseStudyTopBar />

        <div className="xl:grid xl:grid-cols-[9rem_minmax(0,1fr)] xl:gap-16">
          <CaseStudyNav items={navItems} />

          <article className="max-w-3xl pb-24 lg:pb-32">
            <CaseStudyOverview project={project} />
            {project.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}
            <ProcessSteps steps={project.flow} />
            <TakeawaySection project={project} />
            <NextCaseStudy project={nextProject} />
          </article>
        </div>
      </div>
    </div>
  );
}
