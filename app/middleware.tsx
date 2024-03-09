import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { login } from "./services/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("middleware", request.url);
  console.log("middleware next", request.nextUrl.pathname);

  const isLogin = request.cookies.get("token") ? true : false;
  console.log("isLogin", isLogin, request.cookies.get("token"));

  if (!isLogin) return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/home/:path*",
};
