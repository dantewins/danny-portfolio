"use client";

import { Field, ListField, TextArea } from "@/components/admin/field";
import { ImageField } from "@/components/admin/image-field";

export type EditableSection = {
  kind: "prose" | "code" | "figure" | "decision" | "comparison";
  anchor: string;
  nav: string;
  title: string;
  data: Record<string, unknown>;
};

const KINDS: EditableSection["kind"][] = [
  "prose",
  "code",
  "figure",
  "decision",
  "comparison",
];

const str = (data: Record<string, unknown>, key: string) =>
  data[key] === undefined || data[key] === null ? "" : String(data[key]);

const nested = (data: Record<string, unknown>, key: string) =>
  (data[key] ?? {}) as Record<string, unknown>;

export function SectionBuilder({
  sections,
  onChange,
}: {
  sections: EditableSection[];
  onChange: (sections: EditableSection[]) => void;
}) {
  const update = (index: number, next: Partial<EditableSection>) =>
    onChange(
      sections.map((section, i) =>
        i === index ? { ...section, ...next } : section,
      ),
    );

  const updateData = (index: number, patch: Record<string, unknown>) =>
    update(index, { data: { ...sections[index].data, ...patch } });

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="rounded-xl border border-zinc-200 p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <select
              value={section.kind}
              onChange={(event) =>
                update(index, {
                  kind: event.target.value as EditableSection["kind"],
                })
              }
              className="rounded-lg border border-zinc-200 px-2 py-1 font-poppins text-sm text-zinc-800"
            >
              {KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded px-2 py-1 font-poppins text-sm text-zinc-500 hover:bg-zinc-100 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === sections.length - 1}
                className="rounded px-2 py-1 font-poppins text-sm text-zinc-500 hover:bg-zinc-100 disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange(sections.filter((_, i) => i !== index))
                }
                className="rounded px-2 py-1 font-poppins text-sm text-red-700 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Anchor"
              hint="#id used by the sidebar"
              value={section.anchor}
              onChange={(value) => update(index, { anchor: value })}
            />
            <Field
              label="Nav label"
              value={section.nav}
              onChange={(value) => update(index, { nav: value })}
            />
          </div>

          <div className="mt-4">
            <Field
              label="Title"
              hint="*asterisks* render in the serif accent"
              value={section.title}
              onChange={(value) => update(index, { title: value })}
            />
          </div>

          <div className="mt-4 space-y-4">
            {section.kind !== "decision" && section.kind !== "comparison" ? (
              <TextArea
                label="Body"
                value={str(section.data, "body")}
                onChange={(value) => updateData(index, { body: value })}
              />
            ) : (
              <TextArea
                label="Body"
                hint="optional lead-in"
                value={str(section.data, "body")}
                onChange={(value) => updateData(index, { body: value })}
                rows={3}
              />
            )}

            {section.kind === "prose" ? (
              <ListField
                label="Bullets"
                value={
                  Array.isArray(section.data.bullets)
                    ? (section.data.bullets as unknown[]).map(String)
                    : []
                }
                onChange={(value) => updateData(index, { bullets: value })}
              />
            ) : null}

            {section.kind === "code" ? (
              <CodeFields
                data={section.data}
                onPatch={(patch) => updateData(index, patch)}
              />
            ) : null}

            {section.kind === "figure" ? (
              <FigureFields
                data={section.data}
                onPatch={(patch) => updateData(index, patch)}
              />
            ) : null}

            {section.kind === "decision" ? (
              <>
                <Field
                  label="Considered"
                  value={str(section.data, "considered")}
                  onChange={(value) => updateData(index, { considered: value })}
                />
                <Field
                  label="Shipped"
                  value={str(section.data, "shipped")}
                  onChange={(value) => updateData(index, { shipped: value })}
                />
                <TextArea
                  label="Why"
                  value={str(section.data, "why")}
                  onChange={(value) => updateData(index, { why: value })}
                  rows={3}
                />
              </>
            ) : null}

            {section.kind === "comparison" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <PaneFields
                  heading="Before"
                  pane={nested(section.data, "before")}
                  onPatch={(pane) => updateData(index, { before: pane })}
                />
                <PaneFields
                  heading="After"
                  pane={nested(section.data, "after")}
                  onPatch={(pane) => updateData(index, { after: pane })}
                />
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange([
            ...sections,
            {
              kind: "prose",
              anchor: `section-${sections.length + 1}`,
              nav: "New section",
              title: "New section",
              data: { body: "" },
            },
          ])
        }
        className="w-full rounded-xl border border-dashed border-zinc-300 py-3 font-poppins text-sm text-zinc-600 transition-colors hover:bg-zinc-50"
      >
        Add section
      </button>
    </div>
  );
}

function CodeFields({
  data,
  onPatch,
}: {
  data: Record<string, unknown>;
  onPatch: (patch: Record<string, unknown>) => void;
}) {
  const code = nested(data, "code");
  const patchCode = (patch: Record<string, unknown>) =>
    onPatch({ code: { ...code, ...patch } });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Filename"
          value={String(code.filename ?? "")}
          onChange={(value) => patchCode({ filename: value })}
        />
        <Field
          label="Language"
          value={String(code.language ?? "ts")}
          onChange={(value) => patchCode({ language: value })}
        />
      </div>
      <Field
        label="Link"
        hint="permalink to the real file, optional"
        value={String(code.href ?? "")}
        onChange={(value) => patchCode({ href: value })}
      />
      <TextArea
        label="Source"
        hint="paste verbatim — do not retype from memory"
        rows={12}
        value={String(code.source ?? "")}
        onChange={(value) => patchCode({ source: value })}
      />
      <TextArea
        label="Caption"
        rows={3}
        value={String(data.caption ?? "")}
        onChange={(value) => onPatch({ caption: value })}
      />
    </>
  );
}

function FigureFields({
  data,
  onPatch,
}: {
  data: Record<string, unknown>;
  onPatch: (patch: Record<string, unknown>) => void;
}) {
  const figure = nested(data, "figure");
  const patchFigure = (patch: Record<string, unknown>) =>
    onPatch({ figure: { ...figure, ...patch } });

  return (
    <>
      <ImageField
        label="Image"
        value={String(figure.src ?? "")}
        onChange={(value) => patchFigure({ src: value })}
      />
      <Field
        label="Alt text"
        value={String(figure.alt ?? "")}
        onChange={(value) => patchFigure({ alt: value })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Width"
          value={String(figure.width ?? 1440)}
          onChange={(value) => patchFigure({ width: Number(value) || 1440 })}
        />
        <Field
          label="Height"
          value={String(figure.height ?? 930)}
          onChange={(value) => patchFigure({ height: Number(value) || 930 })}
        />
      </div>
      <TextArea
        label="Caption"
        rows={3}
        value={String(figure.caption ?? "")}
        onChange={(value) => patchFigure({ caption: value })}
      />
    </>
  );
}

function PaneFields({
  heading,
  pane,
  onPatch,
}: {
  heading: string;
  pane: Record<string, unknown>;
  onPatch: (pane: Record<string, unknown>) => void;
}) {
  const image = (pane.image ?? {}) as Record<string, unknown>;

  return (
    <div className="rounded-lg bg-zinc-50 p-3">
      <p className="font-poppins text-sm text-zinc-900">{heading}</p>
      <div className="mt-3 space-y-3">
        <Field
          label="Label"
          value={String(pane.label ?? "")}
          onChange={(value) => onPatch({ ...pane, label: value })}
        />
        <TextArea
          label="Caption"
          rows={3}
          value={String(pane.caption ?? "")}
          onChange={(value) => onPatch({ ...pane, caption: value })}
        />
        <ImageField
          label="Image (optional)"
          value={String(image.src ?? "")}
          onChange={(value) =>
            onPatch({
              ...pane,
              image: value
                ? {
                    src: value,
                    alt: String(image.alt ?? ""),
                    width: Number(image.width ?? 1200),
                    height: Number(image.height ?? 800),
                  }
                : undefined,
            })
          }
        />
      </div>
    </div>
  );
}
