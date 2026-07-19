import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectArtwork } from "@/components/project-artwork";
import {
  getNextProject,
  getProject,
  projects,
  type ProjectSlug,
} from "@/lib/projects";
import styles from "./case-study.module.css";

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

  return {
    title: `${project.title} technical case study`,
    description: project.intro,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug as ProjectSlug);

  return (
    <div className={styles.page}>
      <main className={styles.article}>
        <article className={styles.shell}>
          <Link href="/#projects" className={styles.back}>
            <ArrowLeft size={15} aria-hidden="true" /> Back to selected work
          </Link>

          <div className={styles.intro}>
            <p className={styles.kicker}>
              {project.category} · Technical case study
            </p>
            <h1>{project.title}</h1>
            <p className={styles.dek}>{project.intro}</p>

            <div className={styles.byline} aria-label="Article details">
              <span>Written by Danny Kim</span>
              <span>{project.published}</span>
              <span>{project.readTime}</span>
            </div>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Project type</dt>
              <dd>{project.format}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(" · ")}</dd>
            </div>
          </dl>

          <figure className={styles.artwork}>
            <ProjectArtwork slug={project.slug} />
            <figcaption>
              A compact view of the product surface discussed below.
            </figcaption>
          </figure>

          <div className={styles.body}>
            <aside className={styles.toc} aria-label="Article contents">
              <p>In this article</p>
              <ol>
                {project.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className={styles.content}>
              {project.sections.map((section, index) => (
                <section id={section.id} key={section.id}>
                  <p className={styles.sectionNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2>{section.title}</h2>

                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.flow ? (
                    <div className={styles.flow} aria-label="System flow">
                      <span>System flow</span>
                      <ol>
                        {section.flow.map((step, stepIndex) => (
                          <li key={step}>
                            <b>{String(stepIndex + 1).padStart(2, "0")}</b>
                            <code>{step}</code>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {index === 1 && project.media ? (
                    <figure className={styles.media}>
                      <div>
                        <Image
                          src={project.media.src}
                          alt={project.media.alt}
                          fill
                          sizes="(max-width: 720px) 100vw, 720px"
                        />
                      </div>
                      <figcaption>{project.media.caption}</figcaption>
                    </figure>
                  ) : null}
                </section>
              ))}

              <section className={styles.conclusion} aria-labelledby="takeaway-title">
                <p className={styles.sectionNumber}>Closing note</p>
                <h2 id="takeaway-title">What I carried into the next build</h2>
                <p>{project.takeaway}</p>

                <div className={styles.actions}>
                  {project.live ? (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.link} ${styles.linkDark}`}
                    >
                      Visit live project
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ) : null}
                  {project.repository ? (
                    <Link
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View source
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </section>
            </div>
          </div>

          <section className={styles.next} aria-label="Next case study">
            <p>Next technical case study</p>
            <Link href={`/work/${nextProject.slug}`}>
              <span>{nextProject.title}</span>
              <ArrowRight size={28} aria-hidden="true" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}
