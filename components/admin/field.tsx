"use client";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-zinc-200 px-3 py-2 font-raleway text-base text-zinc-900 outline-none focus:border-zinc-900";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="font-poppins text-sm text-zinc-700">{label}</span>
      {hint ? (
        <span className="ml-2 font-merriweather text-xs font-light text-zinc-400 italic">
          {hint}
        </span>
      ) : null}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="font-poppins text-sm text-zinc-700">{label}</span>
      {hint ? (
        <span className="ml-2 font-merriweather text-xs font-light text-zinc-400 italic">
          {hint}
        </span>
      ) : null}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className={`${inputClass} leading-relaxed`}
      />
    </label>
  );
}

export function ListField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  hint?: string;
}) {
  return (
    <TextArea
      label={label}
      hint={hint ?? "one per line"}
      rows={Math.max(3, value.length + 1)}
      value={value.join("\n")}
      onChange={(next) =>
        onChange(
          next
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        )
      }
    />
  );
}
