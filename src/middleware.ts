import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");
  const encryptedOAuthAccessToken = req.cookies.get(
    "encryptedOAuthAccessToken"
  );

  if ((!accessToken || isTokenExpired(accessToken.value)) && refreshToken) {
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
query Query($refreshToken: String!) {
  refreshJWT(refreshToken: $refreshToken)
}
  `,
        variables: {
          refreshToken: refreshToken.value,
        },
      }),
      credentials: "include",
    });

    const { data, errors } = await res.json();

    if (errors) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const response = NextResponse.next();
    response.cookies.set({
      name: "accessToken",
      value: data.refreshJWT,
      expires: new Date(Date.now() + 1000 * 60 * 30),
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    return response;
  }

  if (
    (req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    (req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/apply")) &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/register") &&
    !encryptedOAuthAccessToken
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/signin") && encryptedOAuthAccessToken) {
    return NextResponse.redirect(new URL("/register", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
