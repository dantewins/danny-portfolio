import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/admin/session";

// Deliberately coarse: one shared password, so slow every attempt down enough
// that guessing over the network is impractical.
const DELAY_MS = 400;

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
