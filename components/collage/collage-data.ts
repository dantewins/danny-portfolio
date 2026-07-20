export type CollageFrameData = {
  src: string;
  alt: string;
  label: string;
  rotation: string;
  frameClassName: string;
  imageClassName: string;
};

// Full literal class strings let Tailwind discover every data-driven layout.
// Tailwind's 721px exclusive max preserves the old inclusive 720px breakpoint.
export const collageFrames: CollageFrameData[] = [
  {
    src: "/hero.svg",
    alt: "Black and white illustrated portrait of Danny",
    label: "me, usually thinking",
    rotation: "-3.5deg",
    frameClassName:
      "top-[9%] left-[5%] h-[74%] w-[30%] bg-[#d9ff43] max-[721px]:top-[4%] max-[721px]:left-[4%] max-[721px]:h-[36%] max-[721px]:w-[58%]",
    imageClassName: "object-contain p-0 grayscale contrast-[1.08]",
  },
  {
    src: "/logos/spark.svg",
    alt: "Hand-drawn spark",
    label: "the first idea",
    rotation: "4deg",
    frameClassName:
      "top-[8%] right-[8%] h-[27%] w-[17%] bg-[#ffd64a] max-[721px]:top-[39%] max-[721px]:right-auto max-[721px]:left-[6%] max-[721px]:h-[21%] max-[721px]:w-[31%]",
    imageClassName: "object-contain p-[12%]",
  },
  {
    src: "/logos/caret-spark.svg",
    alt: "Terminal prompt with a small spark",
    label: "build · break · learn · repeat",
    rotation: "2.5deg",
    frameClassName:
      "top-[7%] left-[31%] h-[36%] w-[29%] bg-[#6b8cff] max-[721px]:top-[16%] max-[721px]:right-[2%] max-[721px]:left-auto max-[721px]:h-[25%] max-[721px]:w-[42%]",
    imageClassName: "object-contain p-[12%] invert",
  },
  {
    src: "/logos/paper-plane.svg",
    alt: "Hand-drawn paper plane",
    label: "Florida → the next idea",
    rotation: "-2.5deg",
    frameClassName:
      "right-[4%] bottom-[13%] h-[40%] w-[31%] bg-[#ff775d] max-[721px]:right-[4%] max-[721px]:bottom-[29%] max-[721px]:h-[28%] max-[721px]:w-[56%]",
    imageClassName: "object-contain p-[12%]",
  },
  {
    src: "/logos/broken-loop.svg",
    alt: "Hand-drawn open loop",
    label: "curious by default",
    rotation: "3deg",
    frameClassName:
      "bottom-[8%] left-[32%] h-[28%] w-[24%] bg-[#ffc6df] max-[721px]:bottom-[13%] max-[721px]:left-[7%] max-[721px]:h-[23%] max-[721px]:w-[43%]",
    imageClassName: "object-contain p-[12%]",
  },
  {
    src: "/logos/swirl.svg",
    alt: "Hand-drawn spiral",
    label: "still figuring it out",
    rotation: "-5deg",
    frameClassName:
      "right-[30%] bottom-[2%] h-[23%] w-[17%] bg-[#69dfba] max-[721px]:right-[5%] max-[721px]:bottom-[7%] max-[721px]:h-[20%] max-[721px]:w-[35%]",
    imageClassName: "object-contain p-[12%]",
  },
];
