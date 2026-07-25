"use client";

import { Field, TextArea } from "@/components/admin/field";
import { ImageField } from "@/components/admin/image-field";
import { HeroSlide } from "@/components/case-study/hero-slide";
import { SLIDE_THEMES, type SlideTheme } from "@/lib/projects/types";

export type EditableSlide = {
  eyebrow: string;
  headline: string;
  subhead: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  theme: SlideTheme;
};

export function SlideBuilder({
  slides,
  onChange,
}: {
  slides: EditableSlide[];
  onChange: (slides: EditableSlide[]) => void;
}) {
  const update = (index: number, next: Partial<EditableSlide>) =>
    onChange(
      slides.map((slide, i) => (i === index ? { ...slide, ...next } : slide)),
    );

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {slides.map((slide, index) => (
        <div key={index} className="rounded-xl border border-zinc-200 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <select
              value={slide.theme}
              onChange={(event) =>
                update(index, { theme: event.target.value as SlideTheme })
              }
              className="rounded-lg border border-zinc-200 px-2 py-1 font-poppins text-sm text-zinc-800"
            >
              {SLIDE_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded px-2 py-1 font-poppins text-sm text-zinc-500 hover:bg-zinc-100 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === slides.length - 1}
                className="rounded px-2 py-1 font-poppins text-sm text-zinc-500 hover:bg-zinc-100 disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => onChange(slides.filter((_, i) => i !== index))}
                className="rounded px-2 py-1 font-poppins text-sm text-red-700 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <Field
              label="Eyebrow"
              hint="names the screen, e.g. Matchmaking"
              value={slide.eyebrow}
              onChange={(value) => update(index, { eyebrow: value })}
            />
            <Field
              label="Headline"
              hint="*asterisks* render in the serif accent"
              value={slide.headline}
              onChange={(value) => update(index, { headline: value })}
            />
            <TextArea
              label="Subhead"
              rows={2}
              value={slide.subhead}
              onChange={(value) => update(index, { subhead: value })}
            />
            <ImageField
              label="Screenshot"
              value={slide.imageSrc}
              onChange={(value) => update(index, { imageSrc: value })}
            />
            <Field
              label="Alt text"
              value={slide.imageAlt}
              onChange={(value) => update(index, { imageAlt: value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Image width"
                value={String(slide.imageWidth)}
                onChange={(value) =>
                  update(index, { imageWidth: Number(value) || 1440 })
                }
              />
              <Field
                label="Image height"
                value={String(slide.imageHeight)}
                onChange={(value) =>
                  update(index, { imageHeight: Number(value) || 930 })
                }
              />
            </div>
          </div>

          {slide.imageSrc && slide.headline ? (
            <div className="mt-5">
              <p className="font-merriweather text-xs font-light text-zinc-400 italic">
                Preview
              </p>
              <div className="mt-2">
                <HeroSlide
                  slide={{
                    eyebrow: slide.eyebrow,
                    headline: slide.headline,
                    subhead: slide.subhead,
                    image: {
                      src: slide.imageSrc,
                      alt: slide.imageAlt,
                      width: slide.imageWidth,
                      height: slide.imageHeight,
                    },
                    theme: slide.theme,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange([
            ...slides,
            {
              eyebrow: "",
              headline: "",
              subhead: "",
              imageSrc: "",
              imageAlt: "",
              imageWidth: 1440,
              imageHeight: 930,
              theme: "light",
            },
          ])
        }
        className="w-full rounded-xl border border-dashed border-zinc-300 py-3 font-poppins text-sm text-zinc-600 transition-colors hover:bg-zinc-50"
      >
        Add slide
      </button>
    </div>
  );
}
