import Image from "next/image";
import { Play } from "lucide-react";
import { forwardRef } from "react";

export const CollageTrigger = forwardRef<
  HTMLButtonElement,
  { onOpen: () => void }
>(function CollageTrigger({ onOpen }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="group relative min-h-[clamp(27rem,55vw,39rem)] w-full cursor-pointer overflow-hidden rounded-[0.875rem] border-0 bg-[#11110f] text-left text-[#f5f3ed] transition-[transform,background-color] duration-[220ms] ease-[ease] hover:scale-[1.004] hover:bg-[#181815] focus-visible:outline-[3px] focus-visible:outline-[#11110f] focus-visible:outline-offset-4 max-[721px]:min-h-[31rem]"
      onClick={onOpen}
      aria-haspopup="dialog"
    >
      <span className="absolute inset-0 block" aria-hidden="true">
        <span className="absolute top-[15%] left-[9%] h-[63%] w-[34%] -rotate-5 border border-[rgb(245_243_237_/_14%)] max-[721px]:top-[20%] max-[721px]:left-[-6%] max-[721px]:h-[43%] max-[721px]:w-[64%]" />
        <span className="absolute right-[12%] bottom-[12%] h-[46%] w-[25%] rotate-[4deg] border border-[rgb(245_243_237_/_14%)] max-[721px]:right-[-6%] max-[721px]:bottom-[11%] max-[721px]:h-[34%] max-[721px]:w-[46%]" />

        <span className="absolute top-[19%] left-[4%] -rotate-6 font-poppins text-[clamp(3.5rem,9vw,8.8rem)] leading-none font-medium tracking-[-0.08em] text-[rgb(245_243_237_/_10%)] max-[721px]:top-[28%] max-[721px]:left-[-4%] max-[721px]:text-[4.4rem]">
          curiosity
        </span>
        <Image
          src="/logos/squiggle.svg"
          alt=""
          width={72}
          height={72}
          className="absolute bottom-[16%] left-[17%] h-auto w-[clamp(3.4rem,7vw,6.4rem)] rotate-12 text-[#f5f3ed] opacity-50 invert max-[721px]:bottom-[9%] max-[721px]:left-[7%]"
        />

        <span className="absolute right-[6%] bottom-[11%] rotate-[5deg] font-merriweather text-[clamp(4rem,12vw,11rem)] leading-none font-light tracking-[-0.08em] text-[rgb(245_243_237_/_10%)] italic max-[721px]:right-[1%] max-[721px]:bottom-[16%] max-[721px]:text-[6.8rem]">
          code
        </span>
        <Image
          src="/logos/paper-plane.svg"
          alt=""
          width={68}
          height={68}
          className="absolute top-[17%] right-[18%] h-auto w-[clamp(3.4rem,6vw,5.8rem)] -rotate-8 text-[#f5f3ed] opacity-50 invert max-[721px]:top-[16%] max-[721px]:right-[10%]"
        />
      </span>

      <span className="absolute top-1/2 left-1/2 z-4 grid size-[5.5rem] transform-[translate(-50%,-50%)] place-items-center rounded-full bg-[#f5f3ed] text-[#11110f] transition-transform duration-[280ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:transform-[translate(-50%,-50%)_scale(1.1)_rotate(5deg)] max-[721px]:size-[4.7rem]">
        <Play size={22} fill="currentColor" aria-hidden="true" />
      </span>
      <span className="sr-only">Open Danny&apos;s animated image collage</span>
    </button>
  );
});
