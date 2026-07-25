"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, TextArea } from "@/components/admin/field";
import { ImageField } from "@/components/admin/image-field";
import { RichEditor } from "@/components/admin/rich-editor";
import { SaveBar } from "@/components/admin/save-bar";
import type { TiptapDoc } from "@/lib/posts/render";

type PostState = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: TiptapDoc;
  coverSrc: string;
  coverAlt: string;
  published: boolean;
};

export function PostEditor({ post }: { post: PostState }) {
  const router = useRouter();
  const [state, setState] = useState(post);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const set = <K extends keyof PostState>(key: K, value: PostState[K]) =>
    setState((current) => ({ ...current, [key]: value }));

  async function save(overrides: Partial<PostState> = {}) {
    setPending(true);
    setStatus(null);
    const next = { ...state, ...overrides };

    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: next.slug,
        title: next.title,
        excerpt: next.excerpt,
        body: next.body,
        coverSrc: next.coverSrc || null,
        coverAlt: next.coverAlt || null,
        published: next.published,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    setPending(false);

    if (!response.ok) {
      setStatus(payload.error ?? "Could not save");
      return;
    }

    setState(next);
    setStatus("Saved");
    router.refresh();
  }

  async function remove() {
    if (!window.confirm(`Delete "${state.title}"? This cannot be undone.`)) {
      return;
    }
    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: "DELETE",
    });
    if (response.ok) router.push("/admin");
  }

  return (
    <div className="mt-10">
      <SaveBar
        title={state.title || "Untitled post"}
        status={status}
        pending={pending}
        onSave={() => save()}
        onDelete={remove}
        extra={
          <button
            type="button"
            onClick={() => save({ published: !state.published })}
            disabled={pending}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 font-poppins text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50"
          >
            {state.published ? "Unpublish" : "Publish"}
          </button>
        }
        viewHref={state.published ? `/blog/${state.slug}` : undefined}
      />

      <div className="mt-8 space-y-5">
        <Field
          label="Title"
          value={state.title}
          onChange={(value) => set("title", value)}
        />
        <Field
          label="Slug"
          hint={`/blog/${state.slug || "…"}`}
          value={state.slug}
          onChange={(value) => set("slug", value)}
        />
        <TextArea
          label="Excerpt"
          hint="shown on the home page and blog index"
          value={state.excerpt}
          onChange={(value) => set("excerpt", value)}
          rows={3}
        />
        <ImageField
          label="Cover image"
          value={state.coverSrc}
          onChange={(value) => set("coverSrc", value)}
        />
        {state.coverSrc ? (
          <Field
            label="Cover alt text"
            value={state.coverAlt}
            onChange={(value) => set("coverAlt", value)}
          />
        ) : null}

        <div>
          <span className="font-poppins text-sm text-zinc-700">Body</span>
          <div className="mt-1.5">
            <RichEditor
              value={state.body}
              onChange={(doc) => set("body", doc)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
