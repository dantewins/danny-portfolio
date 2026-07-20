import Image from "next/image";
import type { ProjectHero } from "@/lib/projects";

export function ProjectHeroImage({ hero }: { hero: ProjectHero }) {
  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200">
      <Image
        src={hero.src}
        alt={hero.alt}
        width={hero.width}
        height={hero.height}
        sizes="(max-width: 768px) 100vw, 768px"
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
