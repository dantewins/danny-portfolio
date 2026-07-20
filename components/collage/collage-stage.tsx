import { Pause } from "lucide-react";
import type { CSSProperties } from "react";
import { CollageFrame } from "@/components/collage/collage-frame";
import { collageFrames } from "@/components/collage/collage-data";
import motion from "@/components/collage/collage-motion.module.css";

const noteStyle = { "--collage-delay": "760ms" } as CSSProperties;

export function CollageStage() {
  return (
    <div className="isolate relative min-h-0 flex-1 overflow-hidden bg-[#11110f]">
      <div
        className="absolute inset-0 z-[-1] [background-image:linear-gradient(rgb(255_255_255_/_2%)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_2%)_1px,transparent_1px)] [background-size:2.75rem_2.75rem] max-[721px]:[background-size:2rem_2rem]"
        aria-hidden="true"
      />

      {collageFrames.map((frame, index) => (
        <CollageFrame
          key={frame.src}
          frame={frame}
          index={index}
          frameCount={collageFrames.length}
        />
      ))}

      <div
        className={`${motion.note} absolute bottom-[4%] left-[4.5%] z-5 flex w-[min(18rem,30%)] transform-[rotate(2deg)] items-start gap-[0.55rem] bg-white px-[0.9rem] py-[0.8rem] font-poppins text-[clamp(0.64rem,1vw,0.78rem)] leading-[1.45] font-medium text-[#11110f] max-[721px]:bottom-[2.2%] max-[721px]:left-[6%] max-[721px]:w-[57%] max-[721px]:text-[0.56rem]`}
        style={noteStyle}
      >
        <Pause
          size={12}
          fill="currentColor"
          className="mt-[0.15rem] shrink-0"
          aria-hidden="true"
        />
        <span>Most projects start as one small question.</span>
      </div>
    </div>
  );
}
