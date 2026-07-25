"use client";

import { useRef, useState } from "react";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Upload failed");
      onChange(payload.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="font-poppins text-sm text-zinc-700">{label}</span>

      <div className="mt-1.5 flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/work/… or an uploaded URL"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 font-raleway text-base text-zinc-900 outline-none focus:border-zinc-900"
        />
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 font-poppins text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={input}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
            event.target.value = "";
          }}
        />
      </div>

      {error ? (
        <p className="mt-1.5 font-raleway text-sm text-red-700">{error}</p>
      ) : null}

      {value ? (
        // Deliberately a plain img: these are arbitrary uploaded URLs and this
        // is an internal preview, not a page that needs next/image tuning.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-2 h-28 w-auto rounded-lg border border-zinc-200 object-cover"
        />
      ) : null}
    </div>
  );
}
