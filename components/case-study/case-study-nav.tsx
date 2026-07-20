"use client";

import type { CaseNavItem } from "@/components/case-study/case-study-nav-items";
import { useActiveSection } from "@/components/case-study/use-active-section";

export function CaseStudyNav({ items }: { items: CaseNavItem[] }) {
  const activeSection = useActiveSection(items);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-28 hidden self-start xl:block"
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${item.id}`);
              }}
              className={`font-poppins text-sm transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-zinc-900 underline decoration-wavy underline-offset-4"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
