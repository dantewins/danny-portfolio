import type { Project } from "@/lib/projects";

export function ProcessSteps({ steps }: { steps: Project["flow"] }) {
  return (
    <section
      id="how-it-works"
      className="mt-16 scroll-mt-28 rounded-xl bg-zinc-100 p-6 sm:mt-20 sm:p-8"
    >
      <h2 className="font-poppins text-xl text-zinc-700 sm:text-2xl">
        How it{" "}
        <em className="font-merriweather font-light italic">works</em>
      </h2>
      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-baseline gap-4">
            <span className="font-merriweather text-sm font-light text-zinc-400 italic">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-raleway text-base text-zinc-800 sm:text-lg">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
