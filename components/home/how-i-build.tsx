// Each principle points at code that actually does this. If a claim here stops
// being true in the repo it names, it should come out of this list.
const principles = [
  {
    title: "The server decides what's true",
    body: "The browser gets what it needs to render and nothing it could cheat with. Swordle evaluates guesses in an authenticated route and withholds the answer until the round is actually over, and the six-attempt limit is counted from persisted rows rather than a number the client is trusted to hold.",
    source: "Swordle",
  },
  {
    title: "Bound the work before it bounds you",
    body: "Anything that fans out gets a ceiling. Expounder filters binaries out before ingestion, fetches blobs six at a time, and slices files into fixed parts — so a large repository is slower, not fatal.",
    source: "Expounder",
  },
  {
    title: "Normalize at the boundary",
    body: "External data gets one place to become sane. Notion hands back date-only values, offset timestamps, and floating timestamps; Bunni converts all three into a local day key up front, so nothing downstream has to know the difference.",
    source: "Bunni",
  },
  {
    title: "Degrade instead of crash",
    body: "Model output is input, and input is untrusted. Huracan parses repair advice into typed fields but falls back to Markdown when the shape is missing, and an unrecognized priority becomes medium instead of taking down the parse.",
    source: "Huracan",
  },
];

export function HowIBuild() {
  return (
    <section id="how-i-build" className="py-20 lg:py-32">
      <h6 className="font-raleway text-2xl leading-relaxed text-zinc-700 sm:text-3xl">
        Four things I keep{" "}
        <i className="font-merriweather font-light">relearning</i>
      </h6>

      <ol className="mt-8 space-y-10 lg:mt-12 lg:space-y-12">
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className="grid gap-2 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
          >
            <span
              aria-hidden="true"
              className="font-merriweather text-sm font-light text-zinc-400 italic sm:pt-1.5"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="font-poppins text-xl tracking-tight text-zinc-900 sm:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-2 max-w-2xl font-raleway text-base leading-relaxed text-zinc-700 sm:text-lg">
                {principle.body}
              </p>
              <p className="mt-2 font-merriweather text-sm font-light text-zinc-400 italic">
                {principle.source}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
