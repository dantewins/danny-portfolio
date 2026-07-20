"use client";

import { useEffect, useState } from "react";

export type CaseNavItem = {
  id: string;
  label: string;
};

export function CaseStudyNav({ items }: { items: CaseNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      // Fires when a section heading enters the upper third of the viewport.
      { rootMargin: "-15% 0px -70% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sections"
      className="hidden xl:block sticky top-28 self-start"
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
              className={`font-[raleway] text-sm transition-colors duration-300 ${
                active === item.id
                  ? "text-zinc-900 underline underline-offset-4 decoration-wavy"
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
