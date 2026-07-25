import Image from "next/image";
import {
  SectionBody,
  SectionHeading,
  sectionShellClassName,
} from "@/components/case-study/sections/section-heading";
import type { FigureSection as FigureSectionData } from "@/lib/projects/types";

export function FigureSection({ section }: { section: FigureSectionData }) {
  const { figure } = section;

  return (
    <section id={section.id} className={sectionShellClassName}>
      <SectionHeading title={section.title} />
      <SectionBody>{section.body}</SectionBody>

      <figure className="mt-6">
        <div className="overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            className="h-auto w-full object-cover"
          />
        </div>
        <figcaption className="mt-3 font-raleway text-sm text-zinc-600 sm:text-base">
          {figure.caption}
        </figcaption>
      </figure>
    </section>
  );
}
