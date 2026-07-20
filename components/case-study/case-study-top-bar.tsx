import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CaseStudyTopBar() {
  return (
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
        className="group inline-flex items-center gap-2 font-poppins text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
        All case studies
      </Link>
    </header>
  );
}
