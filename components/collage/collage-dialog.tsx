import { RotateCcw, X } from "lucide-react";
import type { MouseEvent, RefObject } from "react";
import { CollageStage } from "@/components/collage/collage-stage";
import type { CollageDialogState } from "@/components/collage/use-collage-dialog";
import motion from "@/components/collage/collage-motion.module.css";

type CollageDialogProps = {
  state: CollageDialogState;
  replayKey: number;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  onReplay: () => void;
  onRequestClose: () => void;
  onFinishClose: () => void;
};

const iconButtonClassName =
  "grid size-[2.55rem] cursor-pointer place-items-center rounded-full border border-[rgb(17_17_15_/_22%)] bg-transparent text-[#11110f] transition-[background-color,border-color,color,transform] duration-[160ms] ease-[ease] hover:rotate-[4deg] hover:bg-white focus-visible:rotate-[4deg] focus-visible:bg-white max-[721px]:size-[2.35rem]";

export function CollageDialog({
  state,
  replayKey,
  closeButtonRef,
  panelRef,
  onReplay,
  onRequestClose,
  onFinishClose,
}: CollageDialogProps) {
  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) onRequestClose();
  };

  return (
    <div
      className={`${motion.dialog} fixed inset-0 z-[100] grid place-items-center bg-white/90 p-4 backdrop-blur-[3px] max-[721px]:p-[0.45rem]`}
      data-state={state}
      role="dialog"
      aria-modal="true"
      aria-labelledby="collage-title"
      onMouseDown={closeFromBackdrop}
      onAnimationEnd={(event) => {
        if (event.currentTarget === event.target) onFinishClose();
      }}
    >
      <div
        className={`${motion.panel} flex h-[min(52rem,calc(100dvh-2rem))] min-h-[34rem] w-[min(80rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[0.875rem] border border-[rgb(17_17_15_/_18%)] bg-white shadow-[0_2.5rem_7rem_rgb(17_17_15_/_18%)] max-[721px]:h-[calc(100dvh-0.9rem)] max-[721px]:min-h-[31rem] max-[721px]:w-[calc(100vw-0.9rem)]`}
        ref={panelRef}
      >
        <div className="flex min-h-[5.7rem] items-center justify-between gap-4 border-b border-[rgb(17_17_15_/_14%)] py-4 pr-5 pl-6 max-[721px]:min-h-[5.4rem] max-[721px]:py-[0.9rem] max-[721px]:pr-[0.85rem] max-[721px]:pl-4">
          <div>
            <h2
              id="collage-title"
              className="font-poppins text-[clamp(1.05rem,2vw,1.45rem)] font-medium tracking-[-0.035em] max-[721px]:max-w-52 max-[721px]:text-[0.95rem]"
            >
              How ideas usually find me.
            </h2>
          </div>

          <div className="flex items-center gap-[0.45rem]">
            <button
              type="button"
              className={iconButtonClassName}
              onClick={onReplay}
              aria-label="Replay collage animation"
            >
              <RotateCcw size={18} aria-hidden="true" />
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              className={`${iconButtonClassName} border-[#11110f] bg-[#11110f] text-white hover:border-[#11110f] hover:bg-white hover:text-[#11110f] focus-visible:border-[#11110f] focus-visible:bg-white focus-visible:text-[#11110f]`}
              onClick={onRequestClose}
              aria-label="Close image collage"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <CollageStage key={replayKey} />
      </div>
    </div>
  );
}
