import type { Project } from "@/lib/projects";

export function ProjectTags({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {[project.published, project.role].map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-zinc-200 px-3 py-1 font-merriweather text-xs font-light text-zinc-600 italic sm:text-sm"
        >
          {tag}
        </span>
      ))}
      {project.stack.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-zinc-100 px-3 py-1 font-raleway text-xs text-zinc-700 sm:text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
