import { AccentedText } from "@/components/case-study/accented-text";

// Every variant renders through this so nav anchors and the asterisk accent
// stay identical across the whole article.
export function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-poppins text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">
      <AccentedText text={title} />
    </h2>
  );
}

export function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 font-raleway text-base leading-relaxed text-zinc-700 sm:text-lg">
      {children}
    </p>
  );
}

export const sectionShellClassName = "mt-16 scroll-mt-28 sm:mt-20";
