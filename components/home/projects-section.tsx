import { ProjectCard } from "@/components/home/project-card";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="items-center">
        <div className="space-y-4">
          <h6 className="font-raleway text-2xl leading-relaxed text-zinc-700 sm:text-3xl">
            <span className="font-merriweather decoration-wavy underline underline-offset-3">
              Ideas
            </span>{" "}
            make me feel <i className="font-medium">alive</i>
          </h6>
        </div>
      </div>

      <div className="mt-2 grid gap-4 md:mt-4 md:grid-cols-1 lg:mt-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
