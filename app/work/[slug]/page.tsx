import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudyNav, type CaseNavItem } from "@/components/case-study-nav";
import { ProjectSymbol } from "@/components/project-symbol";
import {
  getNextProject,
  getProject,
  projects,
  type ProjectSlug,
} from "@/lib/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  // No title here on purpose — the tab always reads "Danny Kim".
  return { description: project.dek };
}

// Words wrapped in *asterisks* render as the site's italic serif accent.
function Accented({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="font-[merriweather] font-light italic">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug as ProjectSlug);

  const navItems: CaseNavItem[] = [
    { id: "overview", label: "Overview" },
    ...project.sections.map((section) => ({
      id: section.id,
      label: section.nav,
    })),
    { id: "how-it-works", label: "How it works" },
    { id: "takeaway", label: "Takeaway" },
  ];

  return (
    <div className="min-h-screen antialiased">
      <div className="mx-auto max-w-5xl px-6">
        {/* Top bar */}
        <header className="flex items-center justify-between py-8">
          <Link href="/" aria-label="Back to home">
            <Image
              src="/logos/kick.svg"
              alt="Danny Kim"
              width={30}
              height={30}
              className="transition-transform duration-300 ease-in-out hover:-rotate-12"
            />
          </Link>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-[raleway] text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
            All case studies
          </Link>
        </header>

        <div className="xl:grid xl:grid-cols-[9rem_minmax(0,1fr)] xl:gap-16">
          <CaseStudyNav items={navItems} />

          <article className="max-w-3xl pb-24 lg:pb-32">
            {/* Header */}
            <section id="overview" className="scroll-mt-28 pt-8 sm:pt-12">
              <p className="font-[merriweather] text-sm font-light italic text-zinc-500 sm:text-base">
                {project.category}
              </p>
              <h1 className="mt-3 font-[poppins] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
                {project.title}
                <span className="text-zinc-300">.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-[raleway] text-lg leading-relaxed text-zinc-800 sm:text-xl">
                {project.dek}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {[project.published, project.role].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-1 font-[merriweather] text-xs font-light italic text-zinc-600 sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 font-[raleway] text-xs text-zinc-700 sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200">
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  width={project.hero.width}
                  height={project.hero.height}
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                  className="h-auto w-full"
                />
              </div>
            </section>

            {/* Sections */}
            {project.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 mt-16 sm:mt-20"
              >
                <h2 className="font-[poppins] text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">
                  <Accented text={section.title} />
                </h2>
                <p className="mt-4 font-[raleway] text-base leading-relaxed text-zinc-700 sm:text-lg">
                  {section.body}
                </p>
                {section.bullets ? (
                  <ul className="mt-5 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 font-[raleway] text-sm text-zinc-600 sm:text-base"
                      >
                        <span aria-hidden="true" className="text-zinc-400">
                          ·
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {/* How it works */}
            <section
              id="how-it-works"
              className="scroll-mt-28 mt-16 sm:mt-20 rounded-xl bg-zinc-100 p-6 sm:p-8"
            >
              <h2 className="font-[raleway] text-xl text-zinc-700 sm:text-2xl">
                How it{" "}
                <em className="font-[merriweather] font-light italic">
                  works
                </em>
              </h2>
              <ol className="mt-5 space-y-3">
                {project.flow.map((step, index) => (
                  <li key={step} className="flex items-baseline gap-4">
                    <span className="font-[merriweather] text-sm font-light italic text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[raleway] text-base text-zinc-800 sm:text-lg">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Takeaway */}
            <section id="takeaway" className="scroll-mt-28 mt-16 sm:mt-20">
              <p className="font-[raleway] text-sm text-zinc-500">Takeaway</p>
              <blockquote className="mt-3 max-w-2xl font-[merriweather] text-xl font-light italic leading-relaxed text-zinc-800 sm:text-2xl">
                {project.takeaway}
              </blockquote>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {project.live ? (
                  <Button
                    asChild
                    className="h-9 w-full px-5 font-[merriweather] text-base shadow-none sm:h-10 sm:w-auto"
                  >
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live
                    </Link>
                  </Button>
                ) : null}
                {project.repository ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 w-full px-5 font-[merriweather] text-base shadow-none sm:h-10 sm:w-auto"
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
            </section>

            {/* Next case study */}
            <section
              aria-label="Next case study"
              className="mt-20 border-t border-zinc-200 pt-10 sm:mt-24"
            >
              <p className="font-[raleway] text-sm text-zinc-500">
                Next case study
              </p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group mt-3 flex items-center justify-between"
              >
                <span className="flex min-w-0 items-center gap-2 md:gap-3">
                  <ProjectSymbol
                    slug={nextProject.slug}
                    size={30}
                    className="shrink-0 text-zinc-900"
                  />
                  <span className="truncate font-[poppins] text-3xl font-medium tracking-tighter text-zinc-900 sm:text-4xl">
                    {nextProject.title}
                  </span>
                </span>
                <ArrowRight className="h-7 w-7 shrink-0 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg] sm:h-8 sm:w-8" />
              </Link>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
