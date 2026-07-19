import type { ProjectSlug } from "@/lib/projects";

const swordleRows = [
  ["B", "R", "A", "V", "E"],
  ["A", "D", "E", "P", "T"],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export function ProjectArtwork({
  slug,
  compact = false,
}: {
  slug: ProjectSlug;
  compact?: boolean;
}) {
  return (
    <div
      className={`project-artwork project-artwork--${slug}${compact ? " project-artwork--compact" : ""}`}
      aria-hidden="true"
    >
      {slug === "swordle" ? (
        <div className="swordle-ui">
          <div className="artwork-browser-bar">
            <span />
            <span />
            <span />
            <b>SW / 06</b>
          </div>
          <div className="swordle-ui__body">
            <div className="swordle-ui__copy">
              <span>ADJECTIVE</span>
              <strong>Having or showing skill.</strong>
              <small>6 attempts remaining</small>
            </div>
            <div className="swordle-grid">
              {swordleRows.flatMap((row, rowIndex) =>
                row.map((letter, cellIndex) => (
                  <span
                    className={
                      rowIndex === 0 && cellIndex === 1
                        ? "is-yellow"
                        : rowIndex === 1 && cellIndex < 4
                          ? "is-green"
                          : letter
                            ? "is-filled"
                            : ""
                    }
                    key={`${rowIndex}-${cellIndex}`}
                  >
                    {letter}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      ) : null}

      {slug === "scioly" ? (
        <div className="scioly-ui">
          <aside>
            <div className="scioly-ui__mark">SO</div>
            {["Overview", "Members", "Hours", "Events", "Tests"].map(
              (item, index) => (
                <span className={index === 0 ? "is-active" : ""} key={item}>
                  <i /> {item}
                </span>
              ),
            )}
          </aside>
          <div className="scioly-ui__content">
            <div className="scioly-ui__heading">
              <div>
                <small>2026 SEASON</small>
                <strong>Good afternoon, team.</strong>
              </div>
              <button tabIndex={-1}>New event</button>
            </div>
            <div className="scioly-ui__metrics">
              {[
                ["Members", "42"],
                ["Hours logged", "318"],
                ["Upcoming", "06"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <b>{value}</b>
                  <i />
                </div>
              ))}
            </div>
            <div className="scioly-ui__table">
              <span>Next up</span>
              {[
                ["Regional practice", "TUE 04"],
                ["Build check-in", "THU 06"],
                ["Roster lock", "MON 10"],
              ].map(([label, date]) => (
                <div key={label}>
                  <i />
                  <b>{label}</b>
                  <small>{date}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {slug === "huracan" ? (
        <div className="huracan-ui">
          <div className="huracan-ui__rail">
            <strong>Huracán</strong>
            <button tabIndex={-1}>＋ Add inspection</button>
            <small>RECENT</small>
            <span className="is-active">Roof damage · Pine St.</span>
            <span>Exterior wall · 10th Ave.</span>
            <span>Water line · Bay Drive</span>
          </div>
          <div className="huracan-ui__analysis">
            <div className="huracan-ui__photos">
              <span className="photo-one" />
              <span className="photo-two" />
              <span className="photo-three" />
            </div>
            <div className="huracan-ui__answer">
              <small>VISIBLE DAMAGE</small>
              <strong>Severe roof displacement</strong>
              <p>Prioritize safety, document the structure, and arrange a professional inspection.</p>
              <div>
                <span>FEMA context found</span>
                <span>3 next steps</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {slug === "bunni" ? (
        <div className="bunni-ui">
          <div className="bunni-ui__topbar">
            <strong>bunni.</strong>
            <span>July 14 – 20</span>
            <button tabIndex={-1}>＋ Quick task</button>
          </div>
          <div className="bunni-ui__week">
            {["MON 14", "TUE 15", "WED 16", "THU 17", "FRI 18"].map(
              (day, index) => (
                <div className={index === 2 ? "is-today" : ""} key={day}>
                  <span>{day}</span>
                  {index === 0 ? <b>Physics lab</b> : null}
                  {index === 1 ? <b>Read ch. 8</b> : null}
                  {index === 2 ? (
                    <>
                      <b>Calc practice</b>
                      <b>Club form</b>
                    </>
                  ) : null}
                  {index === 3 ? <b>Essay draft</b> : null}
                  {index === 4 ? <b>SAT vocab</b> : null}
                </div>
              ),
            )}
          </div>
          <div className="bunni-ui__sync">
            <i /> Synced with Notion · just now
          </div>
        </div>
      ) : null}

      {slug === "expounder" ? (
        <div className="expounder-ui">
          <aside>
            <strong>expounder_</strong>
            <small>REPOSITORY</small>
            <span>▾ app</span>
            <span className="is-nested">page.tsx</span>
            <span className="is-nested">layout.tsx</span>
            <span>▾ components</span>
            <span className="is-nested">editor.tsx</span>
            <span>package.json</span>
          </aside>
          <div className="expounder-ui__document">
            <div className="expounder-ui__toolbar">
              <span>README.md</span>
              <button tabIndex={-1}>Export</button>
            </div>
            <div className="expounder-ui__paper">
              <small>GENERATED FROM 42 FILES</small>
              <strong>Project overview</strong>
              <i className="line-long" />
              <i className="line-medium" />
              <i className="line-short" />
              <b>Features</b>
              <i className="line-medium" />
              <i className="line-long" />
              <i className="line-short" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
