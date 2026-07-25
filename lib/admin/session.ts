import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "portfolio_admin";
const ALG = "HS256";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set to at least 32 characters.",
    );
  }
  return new TextEncoder().encode(value);
}

/**
 * Compares two strings in time independent of how many leading characters
 * match, so a wrong password cannot be discovered one character at a time.
 */
function constantTimeEquals(a: string, b: string) {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  // Comparing lengths directly would leak the password length, so fold the
  // length difference into the same accumulator as the byte comparison.
  let mismatch = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    mismatch |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return mismatch === 0;
}

export function verifyPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not set.");
  }
  return constantTimeEquals(candidate, expected);
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret(), { algorithms: [ALG] });
    return true;
  } catch {
    return false;
  }
}

/** Throws in any route that must not run for an anonymous caller. */
export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

/**
 * Page-level guard for server components under /admin. proxy.ts already
 * redirects anonymous visitors, but a matcher is easy to misconfigure and a
 * silent failure there would serve content straight out of the database. Every
 * admin page calls this before it queries anything.
 */
export async function requireAdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
