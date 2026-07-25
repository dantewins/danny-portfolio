import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "portfolio_admin";

/**
 * Gate for everything under /admin. The cookie is verified again inside each
 * API route, so this is a redirect for humans rather than the security
 * boundary itself.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (token && secret) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret), {
        algorithms: ["HS256"],
      });
      return NextResponse.next();
    } catch {
      // Fall through to the redirect below.
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
