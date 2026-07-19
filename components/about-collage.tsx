"use client";

import Image from "next/image";
import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const collageFrames = [
  {
    className: "collage-frame collage-frame--portrait",
    src: "/hero.svg",
    alt: "Black and white illustrated portrait of Danny",
    label: "me, usually thinking",
  },
  {
    className: "collage-frame collage-frame--spark",
    src: "/logos/spark.svg",
    alt: "Hand-drawn spark",
    label: "the first idea",
  },
  {
    className: "collage-frame collage-frame--terminal",
    src: "/logos/caret-spark.svg",
    alt: "Terminal prompt with a small spark",
    label: "build · break · learn · repeat",
  },
  {
    className: "collage-frame collage-frame--plane",
    src: "/logos/paper-plane.svg",
    alt: "Hand-drawn paper plane",
    label: "Florida → the next idea",
  },
  {
    className: "collage-frame collage-frame--loop",
    src: "/logos/broken-loop.svg",
    alt: "Hand-drawn open loop",
    label: "curious by default",
  },
  {
    className: "collage-frame collage-frame--swirl",
    src: "/logos/swirl.svg",
    alt: "Hand-drawn spiral",
    label: "still figuring it out",
  },
];

export function AboutCollage() {
  const [dialogState, setDialogState] = useState<
    "closed" | "open" | "closing"
  >("closed");
  const [replayKey, setReplayKey] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);
  const triggerButton = useRef<HTMLButtonElement>(null);
  const dialogPanel = useRef<HTMLDivElement>(null);
  const isMounted = dialogState !== "closed";

  useEffect(() => {
    if (!isMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialogState((state) =>
          state === "open" ? "closing" : state,
        );
        return;
      }

      if (event.key !== "Tab") return;

      const controls = dialogPanel.current?.querySelectorAll<HTMLButtonElement>(
        "button:not([disabled])",
      );
      if (!controls?.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMounted]);

  useEffect(() => {
    if (dialogState !== "closing") return;

    const fallback = window.setTimeout(() => {
      setDialogState("closed");
      window.setTimeout(() => triggerButton.current?.focus(), 0);
    }, 750);

    return () => window.clearTimeout(fallback);
  }, [dialogState]);

  const requestClose = () => {
    setDialogState((state) => (state === "open" ? "closing" : state));
  };

  const finishClose = () => {
    if (dialogState !== "closing") return;

    setDialogState("closed");
    window.setTimeout(() => triggerButton.current?.focus(), 0);
  };

  return (
    <>
      <button
        ref={triggerButton}
        type="button"
        className="story-player group"
        onClick={() => setDialogState("open")}
        aria-haspopup="dialog"
      >
        <span className="story-player__canvas" aria-hidden="true">
          <span className="story-player__word story-player__word--one">
            curiosity
          </span>
          <Image
            src="/logos/squiggle.svg"
            alt=""
            width={72}
            height={72}
            className="story-player__mark story-player__mark--one"
          />
          <span className="story-player__word story-player__word--two">
            code
          </span>
          <Image
            src="/logos/paper-plane.svg"
            alt=""
            width={68}
            height={68}
            className="story-player__mark story-player__mark--two"
          />
        </span>

        <span className="story-player__play">
          <Play size={22} fill="currentColor" aria-hidden="true" />
        </span>
        <span className="sr-only">Open Danny&apos;s animated image collage</span>
      </button>

      {isMounted ? (
        <div
          className="collage-dialog"
          data-state={dialogState}
          role="dialog"
          aria-modal="true"
          aria-labelledby="collage-title"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) requestClose();
          }}
          onAnimationEnd={(event) => {
            if (event.currentTarget === event.target) finishClose();
          }}
        >
          <div className="collage-dialog__panel rounded-xl" ref={dialogPanel}>
            <div className="collage-dialog__bar">
              <div>
                <h2 id="collage-title">How ideas usually find me.</h2>
              </div>
              <div className="collage-dialog__actions">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setReplayKey((key) => key + 1)}
                  aria-label="Replay collage animation"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                </button>
                <button
                  ref={closeButton}
                  type="button"
                  className="icon-button icon-button--dark"
                  onClick={requestClose}
                  aria-label="Close image collage"
                >
                  <X size={19} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="collage-stage" key={replayKey}>
              <div className="collage-stage__grain" aria-hidden="true" />
              {collageFrames.map((frame, index) => (
                <figure
                  className={frame.className}
                  style={{
                    "--collage-delay": `${index * 105 + 80}ms`,
                    "--collage-exit-delay": `${(collageFrames.length - index - 1) * 55}ms`,
                  } as React.CSSProperties}
                  key={frame.src}
                >
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 640px) 55vw, 30vw"
                  />
                  <figcaption>{frame.label}</figcaption>
                </figure>
              ))}

              <div
                className="collage-note"
                style={{ "--collage-delay": "760ms" } as React.CSSProperties}
              >
                <Pause size={12} fill="currentColor" aria-hidden="true" />
                <span>Most projects start as one small question.</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
