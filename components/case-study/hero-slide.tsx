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

// Overlay text always sits on a dark scrim, so it ignores the field colours.
const overlayTone = {
  eyebrow: "text-white/60",
  headline: "text-white",
  subhead: "text-white/80",
};

type Tone = {
  eyebrow: string;
  headline: string;
  subhead: string;
};

function SlideText({
  slide,
  tone,
  className = "",
  // Side layouts give the text a narrow column; full-width ones would wrap far
  // too early at the same measure.
  subheadWidth = "max-w-sm",
}: {
  slide: CaseSlide;
  tone: Tone;
  className?: string;
  subheadWidth?: string;
}) {
  return (
    <div className={className}>
      {slide.eyebrow ? (
        <p
          className={`font-merriweather text-sm font-light italic ${tone.eyebrow}`}
        >
          {slide.eyebrow}
        </p>
      ) : null}

      <p
        className={`mt-2 font-poppins text-2xl leading-[1.15] font-medium tracking-tight sm:text-3xl lg:text-4xl ${tone.headline}`}
      >
        <AccentedText text={slide.headline} />
      </p>

      {slide.subhead ? (
        <p
          className={`mt-3 ${subheadWidth} font-raleway text-base leading-relaxed sm:text-lg ${tone.subhead}`}
        >
          {slide.subhead}
        </p>
      ) : null}
    </div>
  );
}

export function HeroSlide({
  slide,
  priority = false,
}: {
  slide: CaseSlide;
  priority?: boolean;
}) {
  const theme = themes[slide.theme] ?? themes.light;
  const layout = slide.layout ?? "left";

  const image = (
    <Image
      src={slide.image.src}
      alt={slide.image.alt}
      width={slide.image.width}
      height={slide.image.height}
      priority={priority}
      className={`h-full w-auto max-w-none rounded-lg ${theme.shadow}`}
    />
  );

  if (layout === "overlay") {
    return (
      <div className={`relative overflow-hidden rounded-xl ${theme.field}`}>
        <div className="relative aspect-[16/10]">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            width={slide.image.width}
            height={slide.image.height}
            priority={priority}
            className="absolute inset-0 size-full object-cover object-top"
          />
          {/* Screenshots are busy; the scrim is what keeps the text readable. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10" />
          <SlideText
            slide={slide}
            tone={overlayTone}
            subheadWidth="max-w-xl"
            className="absolute inset-x-0 bottom-0 px-6 pb-7 sm:px-10 sm:pb-9"
          />
        </div>
      </div>
    );
  }

  if (layout === "top") {
    return (
      <div className={`relative overflow-hidden rounded-xl ${theme.field}`}>
        <div className="flex flex-col sm:aspect-[16/10]">
          <SlideText
            slide={slide}
            tone={theme}
            subheadWidth="max-w-xl"
            className="px-6 pt-8 sm:px-10 sm:pt-10"
          />
          {/* The screenshot rises from the bottom edge and is clipped there. */}
          <div className="relative mt-6 h-48 overflow-hidden sm:mt-auto sm:h-[58%]">
            <div className="absolute inset-x-6 top-0 bottom-0 sm:inset-x-10">
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                width={slide.image.width}
                height={slide.image.height}
                priority={priority}
                className={`h-auto w-full rounded-t-lg ${theme.shadow}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mirrored = layout === "right";

  return (
    <div className={`relative overflow-hidden rounded-xl ${theme.field}`}>
      <div
        className={`grid gap-7 sm:aspect-[16/10] sm:items-center sm:gap-0 ${
          mirrored
            ? "sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            : "sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        }`}
      >
        {/* Both sides need a gutter: one against the slide edge, one against
            the screenshot. Dropping the inner one lets the text touch the
            image. */}
        <SlideText
          slide={slide}
          tone={theme}
          className={`px-6 pt-8 sm:py-10 ${
            mirrored ? "sm:order-2 sm:pr-10 sm:pl-8" : "sm:pr-8 sm:pl-10"
          }`}
        />

        {/* Height-constrained at natural aspect so the window stays whole and
            legible, and simply runs past one edge. */}
        <div
          className={`relative h-56 overflow-hidden sm:h-full ${
            mirrored ? "sm:order-1" : ""
          }`}
        >
          <div
            className={`absolute inset-y-0 flex sm:inset-y-9 ${
              mirrored ? "right-6 justify-end sm:right-0" : "left-6 sm:left-0"
            }`}
          >
            {image}
          </div>
        </div>
      </div>
    </div>
  );
}
