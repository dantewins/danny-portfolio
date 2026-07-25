"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function SaveBar({
  title,
  status,
  pending,
  onSave,
  onDelete,
  extra,
  viewHref,
}: {
  title: string;
  status: string | null;
  pending: boolean;
  onSave: () => void;
  onDelete: () => void;
  extra?: ReactNode;
  viewHref?: string;
}) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white/90 py-4 backdrop-blur">
      <div className="min-w-0">
        <p className="truncate font-poppins text-xl tracking-tight text-zinc-900">
          {title}
        </p>
        {status ? (
          <p
            className={`font-raleway text-sm ${
              status === "Saved" ? "text-zinc-500" : "text-red-700"
            }`}
          >
            {status}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {viewHref ? (
          <Link
            href={viewHref}
            target="_blank"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 font-poppins text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            View
          </Link>
        ) : null}
        {extra}
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-3 py-1.5 font-poppins text-sm text-red-700 transition-colors hover:bg-red-50"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-1.5 font-poppins text-sm text-white transition-opacity disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
