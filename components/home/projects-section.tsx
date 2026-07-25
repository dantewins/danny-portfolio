import { ProjectCard } from "@/components/home/project-card";
import { SectionHeader } from "@/components/home/section-header";
import { getFeaturedProjects, getProjects } from "@/lib/projects";

export async function ProjectsSection() {
  const [featured, all] = await Promise.all([
    getFeaturedProjects(),
    getProjects(),
  ]);

  if (featured.length === 0) return null;

  return (
    <section id="projects" className="py-20 lg:py-32">
      <SectionHeader
        actionLabel={
          all.length > featured.length ? "All projects" : "All case studies"
        }
        actionHref="/work"
      >
        <span className="font-merriweather decoration-wavy underline underline-offset-3">
          Ideas
        </span>{" "}
        make me feel <i className="font-medium">alive</i>
      </SectionHeader>

      <div className="mt-6 grid gap-4 md:grid-cols-1 lg:mt-8">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
