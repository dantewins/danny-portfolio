import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/session";

const MAX_BYTES = 10 * 1024 * 1024;

// SVG is deliberately excluded. Blob serves uploads as real files, and an SVG
// is an executable document — a <script> inside one runs when the blob URL is
// opened directly. The SVGs already in /public are committed source, not
// uploads, so they are unaffected by this.
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

/** Strips directories and anything that isn't a plain filename character. */
function safeName(name: string) {
  const base = name.split(/[\\/]/).pop() ?? "upload";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 100);
  return cleaned.replace(/^[.-]+/, "") || "upload";
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type ${file.type}` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File is larger than 10MB" },
      { status: 400 },
    );
  }

  // The key is derived from a sanitized name rather than the raw client value,
  // and addRandomSuffix keeps same-named uploads from overwriting each other.
  const blob = await put(safeName(file.name), file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
