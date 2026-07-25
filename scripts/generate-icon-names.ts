/**
 * Regenerates lib/icons/names.ts from the installed @phosphor-icons/react.
 * Run with: npx tsx scripts/generate-icon-names.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "node_modules/@phosphor-icons/react/dist/ssr/index.d.ts";
const TARGET = "lib/icons/names.ts";

const names = [
  ...new Set(
    [...readFileSync(SOURCE, "utf8").matchAll(/export \* from '\.\/(\w+)'/g)].map(
      (match) => match[1],
    ),
  ),
].sort();

writeFileSync(
  TARGET,
  `// Generated from @phosphor-icons/react. Each name N maps to the module
// "@phosphor-icons/react/dist/ssr/N" whose export is \`\${N}Icon\`.
// Regenerate with scripts/generate-icon-names.ts when the package updates.
export const ICON_NAMES = [
${names.map((name) => `  "${name}"`).join(",\n")}
] as const;

export type IconName = (typeof ICON_NAMES)[number];

const ICON_NAME_SET: ReadonlySet<string> = new Set(ICON_NAMES);

/** Guards the dynamic import: only names shipped by the package are loadable. */
export function isIconName(value: string): value is IconName {
  return ICON_NAME_SET.has(value);
}
`,
);

console.log(`wrote ${TARGET} with ${names.length} icons`);
