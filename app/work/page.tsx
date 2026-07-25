import type { Metadata } from "next";
import { CaseStudyTopBar } from "@/components/case-study/case-study-top-bar";
import { ProjectCard } from "@/components/home/project-card";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  description: "Case studies by Danny Kim.",
};

export default async function WorkIndexPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen antialiased">
      <div className="mx-auto max-w-5xl px-6">
        <CaseStudyTopBar backLabel="Home" backHref="/" />

        <main className="pb-24 lg:pb-32">
          <h1 className="mt-8 font-poppins text-5xl font-medium tracking-tight text-zinc-900 sm:mt-12 sm:text-6xl">
            All projects
          </h1>
          <p className="mt-4 max-w-2xl font-raleway text-lg text-zinc-600 sm:text-xl">
            Every case study, including the ones not featured on the home page.
          </p>

          {projects.length === 0 ? (
            <p className="mt-10 font-raleway text-lg text-zinc-600">
              Nothing here yet.
            </p>
          ) : (
            <div className="mt-10 grid gap-4 sm:mt-14">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
