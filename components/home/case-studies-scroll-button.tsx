"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CaseStudiesScrollButton() {
  // Keep browser-only scrolling inside this client leaf so the page stays server-rendered.
  const scrollToProjects = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Button
      variant="default"
      className="group h-[42px] text-base font-normal transition duration-500 ease-in-out"
      onClick={scrollToProjects}
    >
      All case studies{" "}
      <ArrowRight className="size-6 transform transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
    </Button>
  );
}
