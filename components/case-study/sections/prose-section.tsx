import {
  SectionBody,
  SectionHeading,
  sectionShellClassName,
} from "@/components/case-study/sections/section-heading";
import type { ProseSection as ProseSectionData } from "@/lib/projects/types";

export function ProseSection({ section }: { section: ProseSectionData }) {
  return (
    <section id={section.id} className={sectionShellClassName}>
      <SectionHeading title={section.title} />
      <SectionBody>{section.body}</SectionBody>

      {section.bullets ? (
        <ul className="mt-5 space-y-2">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 font-raleway text-sm text-zinc-600 sm:text-base"
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
  );
}
