import { AccentedText } from "@/components/case-study/accented-text";
import type { CaseSection } from "@/lib/projects";

export function ArticleSection({ section }: { section: CaseSection }) {
  return (
    <section
      id={section.id}
      className="mt-16 scroll-mt-28 sm:mt-20"
    >
      <h2 className="font-poppins text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">
        <AccentedText text={section.title} />
      </h2>
      <p className="mt-4 font-raleway text-base leading-relaxed text-zinc-700 sm:text-lg">
        {section.body}
      </p>

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
