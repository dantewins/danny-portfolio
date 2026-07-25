import Link from "next/link";
import {
  SectionBody,
  SectionHeading,
  sectionShellClassName,
} from "@/components/case-study/sections/section-heading";
import type { CodeSection as CodeSectionData } from "@/lib/projects/types";

export function CodeSection({ section }: { section: CodeSectionData }) {
  const { code } = section;

  return (
    <section id={section.id} className={sectionShellClassName}>
      <SectionHeading title={section.title} />
      <SectionBody>{section.body}</SectionBody>

      <figure className="mt-6">
        <div className="overflow-hidden rounded-xl bg-zinc-100">
          <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 px-4 py-2.5 sm:px-5">
            <span className="font-mono text-xs text-zinc-500 sm:text-sm">
              {code.filename}
            </span>
            {code.href ? (
              <Link
                href={code.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-poppins text-xs text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline sm:text-sm"
              >
                View on GitHub
              </Link>
            ) : null}
          </div>

          {/* Long lines scroll inside the block; the page never scrolls sideways. */}
          <div className="overflow-x-auto">
            <pre className="px-4 py-4 sm:px-5">
              <code className="font-mono text-xs leading-relaxed whitespace-pre text-zinc-800 sm:text-sm">
                {code.source}
              </code>
            </pre>
          </div>
        </div>

        <figcaption className="mt-3 font-raleway text-sm text-zinc-600 sm:text-base">
          {section.caption}
        </figcaption>
      </figure>
    </section>
  );
}
