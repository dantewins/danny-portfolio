import Link from "next/link";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/dantewins",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danny-kim-079627334",
    external: true,
  },
  { label: "Email", href: "mailto:kimdanny0603@gmail.com", external: false },
] as const;

export function FooterSection() {
  return (
    <section id="resume" className="pt-20 pb-8 lg:pt-32 lg:pb-20">
      <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
        <div className="space-y-3">
          <p className="font-poppins text-3xl tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Thanks for visiting.
          </p>
          <p className="font-raleway text-base text-zinc-600 sm:text-lg">
            Student developer based in Florida
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 lg:items-end">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center lg:justify-end">
            <Button
              asChild
              className="h-9 w-full px-5 font-poppins text-base shadow-none sm:h-10 sm:w-auto"
            >
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                View resume
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-9 w-full px-5 font-poppins text-base shadow-none sm:h-10 sm:w-auto"
            >
              <Link href="tel:+17542016279">Contact</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-500 sm:text-base lg:justify-end">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-poppins transition-colors hover:text-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
