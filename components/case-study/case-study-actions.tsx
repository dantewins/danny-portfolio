import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

export function CaseStudyActions({ project }: { project: Project }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {project.live ? (
        <Button
          asChild
          className="h-9 w-full px-5 font-poppins text-base shadow-none sm:h-10 sm:w-auto"
        >
          <Link href={project.live} target="_blank" rel="noopener noreferrer">
            Visit live
          </Link>
        </Button>
      ) : null}
      {project.repository ? (
        <Button
          asChild
          variant="outline"
          className="h-9 w-full px-5 font-poppins text-base shadow-none sm:h-10 sm:w-auto"
        >
          <Link
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
