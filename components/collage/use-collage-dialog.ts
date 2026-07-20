import { useEffect, useRef, useState } from "react";

export type CollageDialogState = "closed" | "open" | "closing";

const EXIT_FALLBACK_MS = 750;

export function useCollageDialog() {
  const [state, setState] = useState<CollageDialogState>("closed");
  const [replayKey, setReplayKey] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMounted = state !== "closed";

  useEffect(() => {
    if (!isMounted) return;

    // Preserve the page's prior scroll state while the modal owns interaction.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    // The dialog has two controls, so wrapping Tab keeps focus inside it.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setState((current) =>
          current === "open" ? "closing" : current,
        );
        return;
      }

      if (event.key !== "Tab") return;

      const controls = panelRef.current?.querySelectorAll<HTMLButtonElement>(
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
    if (state !== "closing") return;

    // Keep the dialog mounted through the CSS exit. This is a fallback if
    // animationend never fires, and it must remain longer than the animation.
    const fallback = window.setTimeout(() => {
      setState("closed");
      window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
    }, EXIT_FALLBACK_MS);

    return () => window.clearTimeout(fallback);
  }, [state]);

  const open = () => setState("open");
  const replay = () => setReplayKey((key) => key + 1);
  const requestClose = () => {
    setState((current) => (current === "open" ? "closing" : current));
  };
  const finishClose = () => {
    if (state !== "closing") return;

    setState("closed");
    window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
  };

  return {
    state,
    isMounted,
    replayKey,
    closeButtonRef,
    triggerButtonRef,
    panelRef,
    open,
    replay,
    requestClose,
    finishClose,
  };
}
