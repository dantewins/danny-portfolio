import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Section title with its action on the same line, right-aligned. Both home
 * sections use this so the two links sit at the same optical position.
 */
export function SectionHeader({
  children,
  actionLabel,
  actionHref,
}: {
  children: ReactNode;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <h6 className="font-raleway text-2xl leading-relaxed text-zinc-700 sm:text-3xl">
        {children}
      </h6>

      <Link
        href={actionHref}
        className="group inline-flex shrink-0 items-center gap-2 font-poppins text-sm text-zinc-500 transition-colors hover:text-zinc-900 sm:text-base"
      >
        {actionLabel}
        <ArrowRight className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
