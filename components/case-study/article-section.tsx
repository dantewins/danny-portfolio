import { CodeSection } from "@/components/case-study/sections/code-section";
import { ComparisonSection } from "@/components/case-study/sections/comparison-section";
import { DecisionSection } from "@/components/case-study/sections/decision-section";
import { FigureSection } from "@/components/case-study/sections/figure-section";
import { ProseSection } from "@/components/case-study/sections/prose-section";
import type { CaseSection } from "@/lib/projects";

export function ArticleSection({ section }: { section: CaseSection }) {
  switch (section.kind) {
    case "code":
      return <CodeSection section={section} />;
    case "figure":
      return <FigureSection section={section} />;
    case "decision":
      return <DecisionSection section={section} />;
    case "comparison":
      return <ComparisonSection section={section} />;
    default:
      return <ProseSection section={section} />;
  }
}
