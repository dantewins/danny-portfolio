import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Shared top bar. The back link names wherever it actually goes, so a blog page
 * does not offer to take you to case studies.
 */
export function CaseStudyTopBar({
  backLabel = "All case studies",
  backHref = "/work",
}: {
  backLabel?: string;
  backHref?: string;
}) {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" aria-label="Back to home">
        <Image
          src="/logos/d.svg"
          alt="Danny Kim"
          width={30}
          height={30}
          className="rounded-[7px] transition-transform duration-300 ease-in-out hover:-rotate-12"
        />
      </Link>
      <Link
        href={backHref}
        className="group inline-flex items-center gap-2 font-poppins text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
        {backLabel}
      </Link>
    </header>
  );
}
