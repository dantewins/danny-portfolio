import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/session";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

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

  // addRandomSuffix keeps same-named uploads from overwriting each other.
  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
