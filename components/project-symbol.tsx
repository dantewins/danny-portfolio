import {
  FlaskIcon,
  HurricaneIcon,
  NoteIcon,
  RabbitIcon,
  SwordIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ProjectIcon } from "@/lib/projects";

const symbols = {
  sword: SwordIcon,
  flask: FlaskIcon,
  hurricane: HurricaneIcon,
  rabbit: RabbitIcon,
  note: NoteIcon,
} satisfies Record<ProjectIcon, typeof SwordIcon>;

export function ProjectSymbol({
  icon,
  size = 32,
  className,
}: {
  icon: string;
  size?: number;
  className?: string;
}) {
  // Icons come from the database, so an unrecognized key must not crash a page.
  const Symbol = symbols[icon as ProjectIcon] ?? NoteIcon;
  return <Symbol size={size} weight="duotone" className={className} />;
}
