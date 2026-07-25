import Image from "next/image";
import { AccentedText } from "@/components/case-study/accented-text";
import type { CaseSlide } from "@/lib/projects/types";

const themes = {
  light: {
    field: "bg-zinc-100",
    eyebrow: "text-zinc-400",
    headline: "text-zinc-900",
    subhead: "text-zinc-600",
    shadow: "shadow-[0_18px_50px_-20px_rgba(17,17,15,0.35)]",
  },
  ink: {
    field: "bg-[#11110f]",
    eyebrow: "text-zinc-500",
    headline: "text-white",
    subhead: "text-zinc-400",
    shadow: "shadow-[0_18px_60px_-20px_rgba(0,0,0,0.8)]",
  },
} as const;

export function HeroSlide({
  slide,
  priority = false,
}: {
  slide: CaseSlide;
  priority?: boolean;
}) {
  const theme = themes[slide.theme] ?? themes.light;

  return (
    <div className={`relative overflow-hidden rounded-xl ${theme.field}`}>
      <div className="grid gap-7 sm:aspect-[16/10] sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-center sm:gap-0">
        <div className="px-6 pt-8 sm:px-10 sm:py-10">
          {slide.eyebrow ? (
            <p
              className={`font-merriweather text-sm font-light italic ${theme.eyebrow}`}
            >
              {slide.eyebrow}
            </p>
          ) : null}

          <p
            className={`mt-2 font-poppins text-2xl leading-[1.15] font-medium tracking-tight sm:text-3xl lg:text-4xl ${theme.headline}`}
          >
            <AccentedText text={slide.headline} />
          </p>

          {slide.subhead ? (
            <p
              className={`mt-3 max-w-sm font-raleway text-base leading-relaxed sm:text-lg ${theme.subhead}`}
            >
              {slide.subhead}
            </p>
          ) : null}
        </div>

        {/* The screenshot runs off the right edge: there is always more app
            than fits, and cropping it says so without a fake browser frame. */}
        <div className="relative h-56 overflow-hidden sm:h-full">
          {/* Height-constrained with natural aspect, so the window stays whole
              and legible and simply runs past the right edge. object-cover here
              would zoom into a fragment instead. */}
          <div className="absolute inset-y-0 left-6 sm:inset-y-9 sm:left-0">
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              width={slide.image.width}
              height={slide.image.height}
              priority={priority}
              className={`h-full w-auto max-w-none rounded-l-lg ${theme.shadow}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
