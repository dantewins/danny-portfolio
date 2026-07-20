"use client";

import { useEffect, useState } from "react";
import type { CaseNavItem } from "@/components/case-study/case-study-nav-items";

export function useActiveSection(items: CaseNavItem[]) {
  const [activeSection, setActiveSection] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      // Activate a section while it crosses the 15% to 30% viewport band.
      { rootMargin: "-15% 0px -70% 0px" },
    );

    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  return activeSection;
}
