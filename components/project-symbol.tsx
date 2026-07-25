import { NoteIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { isIconName } from "@/lib/icons/names";

/**
 * Loads one icon module on the server. A static namespace import would pull all
 * 1500+ icons into the bundle for the sake of the handful actually used, so the
 * name is validated against the generated list and imported on demand.
 */
export async function ProjectSymbol({
  icon,
  size = 32,
  className,
}: {
  icon: string;
  size?: number;
  className?: string;
}) {
  let Symbol: Icon = NoteIcon;

  if (isIconName(icon)) {
    try {
      const loaded = (await import(
        `@phosphor-icons/react/dist/ssr/${icon}`
      )) as Record<string, Icon>;
      Symbol = loaded[`${icon}Icon`] ?? NoteIcon;
    } catch {
      // Falls through to the default: a missing icon must not break a page.
    }
  }

  return <Symbol size={size} weight="duotone" className={className} />;
}
