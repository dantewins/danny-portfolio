"use client";

// The whole icon set is imported here on purpose. This component is only ever
// reached from /admin, so it code-splits away from every public page, and the
// picker needs to render arbitrary icons the instant they are searched for.
import * as Phosphor from "@phosphor-icons/react";
import { createElement, useMemo, useState } from "react";
import { ICON_NAMES } from "@/lib/icons/names";

const RESULT_LIMIT = 72;

/**
 * Looks an icon up by name and renders it. These are stable module exports, but
 * they are resolved at render time, so they go through createElement rather
 * than being bound to a capitalised local — which reads as a component defined
 * during render.
 */
function renderIcon(name: string, size: number) {
  const icon = (
    Phosphor as unknown as Record<string, Phosphor.Icon | undefined>
  )[`${name}Icon`];
  return icon ? createElement(icon, { size, weight: "duotone" }) : null;
}

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (icon: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ICON_NAMES.slice(0, RESULT_LIMIT);
    const starts: string[] = [];
    const contains: string[] = [];
    for (const name of ICON_NAMES) {
      const lower = name.toLowerCase();
      if (lower.startsWith(needle)) starts.push(name);
      else if (lower.includes(needle)) contains.push(name);
      if (starts.length >= RESULT_LIMIT) break;
    }
    return [...starts, ...contains].slice(0, RESULT_LIMIT);
  }, [query]);

  return (
    <div>
      <span className="font-poppins text-sm text-zinc-700">Icon</span>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-1.5 flex w-full items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-left transition-colors hover:bg-zinc-50"
      >
        <span className="shrink-0">
          {renderIcon(value, 24) ?? (
            <span className="block size-6 rounded bg-zinc-100" />
          )}
        </span>
        <span className="font-raleway text-base text-zinc-900">
          {value || "Choose an icon"}
        </span>
        <span className="ml-auto font-merriweather text-xs font-light text-zinc-400 italic">
          {ICON_NAMES.length} icons
        </span>
      </button>

      {open ? (
        <div className="mt-2 rounded-lg border border-zinc-200 p-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search icons…"
            autoFocus
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 font-raleway text-base text-zinc-900 outline-none focus:border-zinc-900"
          />

          <div className="mt-3 grid max-h-64 grid-cols-6 gap-1 overflow-y-auto sm:grid-cols-9">
            {matches.map((name) => {
              const preview = renderIcon(name, 22);
              if (!preview) return null;
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`flex aspect-square items-center justify-center rounded transition-colors ${
                    name === value
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {preview}
                </button>
              );
            })}
          </div>

          {matches.length === 0 ? (
            <p className="mt-3 font-raleway text-sm text-zinc-500">
              No icon matches “{query}”.
            </p>
          ) : (
            <p className="mt-3 font-merriweather text-xs font-light text-zinc-400 italic">
              Showing {matches.length}
              {matches.length === RESULT_LIMIT ? " — keep typing to narrow" : ""}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
