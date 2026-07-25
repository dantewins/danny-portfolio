import Image from "next/image";
import {
  SectionBody,
  SectionHeading,
  sectionShellClassName,
} from "@/components/case-study/sections/section-heading";
import type {
  ComparisonPane,
  ComparisonSection as ComparisonSectionData,
} from "@/lib/projects/types";

function Pane({ pane, tone }: { pane: ComparisonPane; tone: "before" | "after" }) {
  return (
    <div className="flex flex-col">
      <p className="font-merriweather text-sm font-light text-zinc-400 italic">
        {tone === "before" ? "Before" : "After"}
      </p>

      {pane.image ? (
        <div className="mt-3 overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={pane.image.src}
            alt={pane.image.alt}
            width={pane.image.width}
            height={pane.image.height}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <p className="mt-3 font-poppins text-base text-zinc-900 sm:text-lg">
        {pane.label}
      </p>
      <p className="mt-2 font-raleway text-sm leading-relaxed text-zinc-600 sm:text-base">
        {pane.caption}
      </p>
    </div>
  );
}

export function ComparisonSection({
  section,
}: {
  section: ComparisonSectionData;
}) {
  return (
    <section id={section.id} className={sectionShellClassName}>
      <SectionHeading title={section.title} />
      {section.body ? <SectionBody>{section.body}</SectionBody> : null}

      <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-6">
        <Pane pane={section.before} tone="before" />
        <Pane pane={section.after} tone="after" />
      </div>
    </section>
  );
}
