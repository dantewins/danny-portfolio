import {
  FlaskIcon,
  HurricaneIcon,
  NoteIcon,
  RabbitIcon,
  SwordIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ProjectSlug } from "@/lib/projects";

const symbols = {
  swordle: SwordIcon,
  scioly: FlaskIcon,
  huracan: HurricaneIcon,
  bunni: RabbitIcon,
  expounder: NoteIcon,
} satisfies Record<ProjectSlug, typeof SwordIcon>;

export function ProjectSymbol({
  slug,
  size = 32,
  className,
}: {
  slug: ProjectSlug;
  size?: number;
  className?: string;
}) {
  const Symbol = symbols[slug];
  return <Symbol size={size} weight="duotone" className={className} />;
}
