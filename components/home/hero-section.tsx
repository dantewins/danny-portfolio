import Image from "next/image";
import { CaseStudiesScrollButton } from "@/components/home/case-studies-scroll-button";

export function HeroSection() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-12 py-12 sm:py-16 lg:flex-row lg:gap-16">
      <div className="flex-1 space-y-7 text-center lg:space-y-7 lg:text-left">
        <h1 className="font-poppins text-4xl tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Hello! My{" "}
          <span className="font-merriweather font-light not-italic lg:italic">
            name is{" "}
          </span>{" "}
          <span className="font-medium">Danny</span>.
        </h1>

        <p className="mx-auto max-w-xl font-raleway text-lg text-zinc-800 md:text-xl lg:mx-0">
          I am an incoming <b>senior</b> in high school, attending{" "}
          <i>Pembroke Pines Charter High School.</i> With my <b>fervent</b> love
          for code, I build{" "}
          <u className="underline-offset-6">clean</u>,{" "}
          <u className="decoration-wavy underline-offset-4">performant</u>{" "}
          <b>experiences</b> with modern tools like{" "}
          <i className="font-merriweather font-light">
            Next.js, TypeScript, and Tailwind.
          </i>
        </p>

        <div className="pt-2 lg:pt-5">
          <CaseStudiesScrollButton />
        </div>
      </div>

      <div className="flex flex-1 justify-center pt-6 lg:justify-end lg:pt-0">
        <Image
          src="/hero.svg"
          alt="hero illustration"
          className="h-auto w-[325px] max-w-full rounded-xl object-contain sm:w-[400px] lg:w-[450px]"
          width={450}
          height={350}
        />
      </div>
    </section>
  );
}
