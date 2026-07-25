"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NewItemButton({ kind }: { kind: "case-study" | "post" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const label = kind === "post" ? "New post" : "New case study";
  const endpoint = kind === "post" ? "/api/admin/posts" : "/api/admin/case-studies";

  async function create() {
    const title = window.prompt(`Title for the new ${kind.replace("-", " ")}`);
    if (!title?.trim()) return;

    const slug = slugify(title);
    if (!slug) {
      window.alert("That title does not produce a usable slug.");
      return;
    }

    setPending(true);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), slug }),
    });
    const payload = await response.json().catch(() => ({}));
    setPending(false);

    if (!response.ok) {
      window.alert(payload.error ?? "Could not create it.");
      return;
    }

    const id = payload.post?.id ?? payload.caseStudy?.id;
    router.push(kind === "post" ? `/admin/posts/${id}` : `/admin/case-studies/${id}`);
  }

  return (
    <button
      type="button"
      onClick={create}
      disabled={pending}
      className="shrink-0 rounded-lg bg-zinc-900 px-3 py-1.5 font-poppins text-sm text-white transition-opacity disabled:opacity-50"
    >
      {pending ? "Creating…" : label}
    </button>
  );
}
