import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectSymbol } from "@/components/project-symbol";
import type { Project } from "@/lib/projects";

export function NextCaseStudy({ project }: { project: Project }) {
  return (
    <section
      aria-label="Next case study"
      className="mt-20 border-t border-zinc-200 pt-10 sm:mt-24"
    >
      <p className="font-raleway text-sm text-zinc-500">Next case study</p>
      <Link
        href={`/work/${project.slug}`}
        className="group mt-3 flex items-center justify-between"
      >
        <span className="flex min-w-0 items-center gap-2 md:gap-3">
          <ProjectSymbol
            icon={project.icon}
            size={30}
            className="shrink-0 text-zinc-900"
          />
          <span className="truncate font-poppins text-3xl font-medium tracking-tighter text-zinc-900 sm:text-4xl">
            {project.title}
          </span>
        </span>
        <ArrowRight className="size-7 shrink-0 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg] sm:size-8" />
      </Link>
    </section>
  );
}
