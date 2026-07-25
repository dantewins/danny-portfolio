"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useRef, useState } from "react";
import type { TiptapDoc } from "@/lib/posts/render";

type RichEditorProps = {
  value: TiptapDoc;
  onChange: (doc: TiptapDoc) => void;
};

const buttonClass =
  "rounded px-2 py-1 font-poppins text-xs transition-colors sm:text-sm";

export function RichEditor({ value, onChange }: RichEditorProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    // Tiptap renders identical markup on both passes only after mount.
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getJSON() as TiptapDoc),
    editorProps: {
      attributes: {
        class:
          "min-h-[24rem] rounded-b-xl bg-white px-4 py-4 font-raleway text-base leading-relaxed text-zinc-800 focus:outline-none sm:px-5",
      },
    },
  });

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
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

        editor.chain().focus().setImage({ src: payload.url }).run();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [editor],
  );

  if (!editor) {
    return (
      <div className="min-h-[28rem] rounded-xl border border-zinc-200 bg-zinc-50" />
    );
  }

  const toggle = (active: boolean) =>
    `${buttonClass} ${active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-200"}`;

  return (
    <div className="rounded-xl border border-zinc-200">
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border-b border-zinc-200 bg-zinc-50 px-2 py-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toggle(editor.isActive("bold"))}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toggle(editor.isActive("italic"))}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={toggle(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={toggle(editor.isActive("heading", { level: 3 }))}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toggle(editor.isActive("bulletList"))}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toggle(editor.isActive("orderedList"))}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={toggle(editor.isActive("blockquote"))}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={toggle(editor.isActive("codeBlock"))}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => {
            const previous = editor.getAttributes("link").href ?? "";
            const href = window.prompt("Link URL", previous);
            if (href === null) return;
            if (href === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href }).run();
          }}
          className={toggle(editor.isActive("link"))}
        >
          Link
        </button>

        <span className="mx-1 h-4 w-px bg-zinc-300" />

        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className={`${buttonClass} text-zinc-600 hover:bg-zinc-200 disabled:opacity-50`}
        >
          {uploading ? "Uploading…" : "Insert image"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void uploadImage(file);
            event.target.value = "";
          }}
        />
      </div>

      {error ? (
        <p className="border-b border-red-200 bg-red-50 px-4 py-2 font-raleway text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div
        onDrop={(event) => {
          const file = event.dataTransfer.files?.[0];
          if (file?.type.startsWith("image/")) {
            event.preventDefault();
            void uploadImage(file);
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
