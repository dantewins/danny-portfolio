import {
  SectionBody,
  SectionHeading,
  sectionShellClassName,
} from "@/components/case-study/sections/section-heading";
import type { DecisionSection as DecisionSectionData } from "@/lib/projects/types";

export function DecisionSection({ section }: { section: DecisionSectionData }) {
  const rows = [
    { label: "Considered", value: section.considered },
    { label: "Shipped", value: section.shipped },
    { label: "Why", value: section.why },
  ];

  return (
    <section id={section.id} className={sectionShellClassName}>
      <SectionHeading title={section.title} />
      {section.body ? <SectionBody>{section.body}</SectionBody> : null}

      <dl className="mt-6 divide-y divide-zinc-200 rounded-xl bg-zinc-100 px-6 sm:px-8">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6"
          >
            <dt className="font-merriweather text-sm font-light text-zinc-400 italic sm:w-24 sm:shrink-0 sm:pt-1">
              {row.label}
            </dt>
            <dd className="font-raleway text-base leading-relaxed text-zinc-800 sm:text-lg">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
