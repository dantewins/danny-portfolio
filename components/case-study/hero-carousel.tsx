"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroSlide } from "@/components/case-study/hero-slide";
import type { CaseSlide } from "@/lib/projects/types";

export function HeroCarousel({ slides }: { slides: CaseSlide[] }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const region = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    const node = region.current;
    if (!node) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      }
    }

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [go, index]);

  if (count === 0) return null;
  if (count === 1) {
    return (
      <div className="mt-10 sm:mt-12">
        <HeroSlide slide={slides[0]} priority />
      </div>
    );
  }

  return (
    <div className="mt-10 sm:mt-12">
      <div
        ref={region}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Screens from this project"
        className="overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        {/* One rail translated horizontally. motion-reduce drops the animation
            but keeps the position, so the control still works. */}
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, position) => (
            <div
              key={position}
              className="w-full shrink-0"
              aria-hidden={position !== index}
              // Keeps offscreen slides out of the tab order entirely.
              inert={position !== index}
            >
              <HeroSlide slide={slide} priority={position === 0} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {slides.map((slide, position) => (
            <button
              key={position}
              type="button"
              onClick={() => go(position)}
              aria-label={`Go to ${slide.eyebrow || `slide ${position + 1}`}`}
              aria-current={position === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                position === index
                  ? "w-6 bg-zinc-900"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="mr-2 font-merriweather text-sm font-light text-zinc-400 italic">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous screen"
            className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next screen"
            className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
