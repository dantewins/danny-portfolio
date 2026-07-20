import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectSymbol } from "@/components/project-symbol";
import { Card, CardHeader } from "@/components/ui/card";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group overflow-hidden rounded-xl border-none bg-zinc-100 px-4 py-5 shadow-none transition duration-300 ease-in-out hover:scale-102 hover:cursor-pointer sm:p-6">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
      >
        <CardHeader className="mt-0 px-2 text-zinc-900 sm:my-2 sm:gap-2 sm:px-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-1 md:gap-2">
              <div className="shrink-0">
                <ProjectSymbol slug={project.slug} size={32} />
              </div>
              <span className="flex items-center font-poppins text-xl font-medium tracking-tighter sm:text-2xl md:text-3xl">
                {project.title}
              </span>
            </div>

            <ArrowRight className="mr-2 size-[1.6rem] shrink-0 transform transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg] sm:size-[1.8rem] md:size-[2.1rem]" />
          </div>

          <div className="grid grid-cols-7">
            <span className="col-span-5 mt-1 font-poppins text-sm font-normal tracking-tight text-zinc-500 sm:col-span-6 sm:text-lg md:col-span-5 md:mt-2 md:text-xl">
              {project.shortDescription}
            </span>
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
}
