import { NextResponse } from "next/server";

/** Studio uses tab-local sessionStorage auth (Lunar Cafe pattern). */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
