"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, ListField, TextArea } from "@/components/admin/field";
import { IconPicker } from "@/components/admin/icon-picker";
import { ImageField } from "@/components/admin/image-field";
import { SaveBar } from "@/components/admin/save-bar";
import {
  SectionBuilder,
  type EditableSection,
} from "@/components/admin/section-builder";
import {
  SlideBuilder,
  type EditableSlide,
} from "@/components/admin/slide-builder";

export type CaseStudyState = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  dek: string;
  role: string;
  publishedLabel: string;
  icon: string;
  featured: boolean;
  stack: string[];
  repository: string;
  live: string;
  heroSrc: string;
  heroAlt: string;
  heroWidth: number;
  heroHeight: number;
  flow: string[];
  takeaway: string;
  slides: EditableSlide[];
  sections: EditableSection[];
};

export function CaseStudyEditor({ caseStudy }: { caseStudy: CaseStudyState }) {
  const router = useRouter();
  const [state, setState] = useState(caseStudy);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const set = <K extends keyof CaseStudyState>(
    key: K,
    value: CaseStudyState[K],
  ) => setState((current) => ({ ...current, [key]: value }));

  async function save() {
    setPending(true);
    setStatus(null);

    const response = await fetch(`/api/admin/case-studies/${caseStudy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...state,
        repository: state.repository || null,
        live: state.live || null,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    setPending(false);

    if (!response.ok) {
      setStatus(payload.error ?? "Could not save");
      return;
    }

    setStatus("Saved");
    router.refresh();
  }

  async function remove() {
    if (!window.confirm(`Delete "${state.title}"? This cannot be undone.`)) {
      return;
    }
    const response = await fetch(`/api/admin/case-studies/${caseStudy.id}`, {
      method: "DELETE",
    });
    if (response.ok) router.push("/admin");
  }

  return (
    <div className="mt-10">
      <SaveBar
        title={state.title || "Untitled case study"}
        status={status}
        pending={pending}
        onSave={save}
        onDelete={remove}
        viewHref={`/work/${state.slug}`}
      />

      <div className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Title"
            value={state.title}
            onChange={(value) => set("title", value)}
          />
          <Field
            label="Slug"
            hint={`/work/${state.slug || "…"}`}
            value={state.slug}
            onChange={(value) => set("slug", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Category"
            value={state.category}
            onChange={(value) => set("category", value)}
          />
          <Field
            label="Role"
            value={state.role}
            onChange={(value) => set("role", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Published label"
            hint="e.g. July 2025"
            value={state.publishedLabel}
            onChange={(value) => set("publishedLabel", value)}
          />
          <IconPicker
            value={state.icon}
            onChange={(icon) => set("icon", icon)}
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={state.featured}
            onChange={(event) => set("featured", event.target.checked)}
            className="size-4 accent-zinc-900"
          />
          <span className="font-poppins text-sm text-zinc-700">
            Featured on the home page
          </span>
          <span className="font-merriweather text-xs font-light text-zinc-400 italic">
            unfeatured still appears at /work
          </span>
        </label>

        <TextArea
          label="Short description"
          hint="the home page card"
          value={state.shortDescription}
          onChange={(value) => set("shortDescription", value)}
          rows={3}
        />
        <TextArea
          label="Dek"
          hint="the standfirst under the title"
          value={state.dek}
          onChange={(value) => set("dek", value)}
          rows={3}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Repository"
            value={state.repository}
            onChange={(value) => set("repository", value)}
          />
          <Field
            label="Live URL"
            value={state.live}
            onChange={(value) => set("live", value)}
          />
        </div>

        <ListField
          label="Stack"
          value={state.stack}
          onChange={(value) => set("stack", value)}
        />

        <ImageField
          label="Hero image"
          value={state.heroSrc}
          onChange={(value) => set("heroSrc", value)}
        />
        <Field
          label="Hero alt text"
          value={state.heroAlt}
          onChange={(value) => set("heroAlt", value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Hero width"
            value={String(state.heroWidth)}
            onChange={(value) => set("heroWidth", Number(value) || 1440)}
          />
          <Field
            label="Hero height"
            value={String(state.heroHeight)}
            onChange={(value) => set("heroHeight", Number(value) || 930)}
          />
        </div>

        <ListField
          label="How it works"
          hint="one step per line"
          value={state.flow}
          onChange={(value) => set("flow", value)}
        />
        <TextArea
          label="Takeaway"
          value={state.takeaway}
          onChange={(value) => set("takeaway", value)}
          rows={3}
        />

        <div className="pt-4">
          <h2 className="font-poppins text-xl font-medium tracking-tight text-zinc-900">
            Hero slides
          </h2>
          <p className="mt-1 font-raleway text-sm text-zinc-500">
            Shown as a carousel at the top. With no slides, the hero image is
            used instead.
          </p>
          <div className="mt-4">
            <SlideBuilder
              slides={state.slides}
              onChange={(slides) => set("slides", slides)}
            />
          </div>
        </div>

        <div className="pt-4">
          <h2 className="font-poppins text-xl font-medium tracking-tight text-zinc-900">
            Sections
          </h2>
          <p className="mt-1 font-raleway text-sm text-zinc-500">
            Anchors must be unique. Order here is the order on the page and in
            the sidebar.
          </p>
          <div className="mt-4">
            <SectionBuilder
              sections={state.sections}
              onChange={(sections) => set("sections", sections)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
