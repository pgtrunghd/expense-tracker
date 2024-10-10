import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const res = NextResponse.next();

  // const accessToken = request.cookies.get("access_token");

  // if (accessToken) {
  //   if (request.nextUrl.pathname.startsWith("/login")) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  //   return res;
  // }
  // return NextResponse.rewrite(new URL("/login", request.url));
}
