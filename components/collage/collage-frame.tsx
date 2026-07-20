import Image from "next/image";
import type { CSSProperties } from "react";
import type { CollageFrameData } from "@/components/collage/collage-data";
import motion from "@/components/collage/collage-motion.module.css";

type FrameProperties = CSSProperties & {
  "--frame-rotate": string;
  "--collage-delay": string;
  "--collage-exit-delay": string;
};

export function CollageFrame({
  frame,
  index,
  frameCount,
}: {
  frame: CollageFrameData;
  index: number;
  frameCount: number;
}) {
  const style: FrameProperties = {
    "--frame-rotate": frame.rotation,
    "--collage-delay": `${index * 105 + 80}ms`,
    "--collage-exit-delay": `${(frameCount - index - 1) * 55}ms`,
  };

  return (
    <figure
      className={`${motion.frame} absolute overflow-hidden border-[0.45rem] border-white shadow-[0_1.1rem_2.7rem_rgb(0_0_0_/_28%)] max-[721px]:border-[0.3rem] ${frame.frameClassName}`}
      style={style}
    >
      <Image
        src={frame.src}
        alt={frame.alt}
        fill
        sizes="(max-width: 640px) 55vw, 30vw"
        className={frame.imageClassName}
      />
      <figcaption className="absolute right-[0.35rem] bottom-[0.35rem] left-[0.35rem] bg-[rgb(255_255_255_/_92%)] px-[0.45rem] py-[0.35rem] font-poppins text-[0.51rem] font-semibold tracking-[0.07em] text-[#11110f] uppercase max-[721px]:text-[0.43rem]">
        {frame.label}
      </figcaption>
    </figure>
  );
}
