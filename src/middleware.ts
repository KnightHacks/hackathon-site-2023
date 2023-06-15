import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils";

export const runtime = "experimental-edge";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const isProduction = process.env.NODE_ENV === "production"; // redirect only in production
  const requestedHost = req.headers.get("X-Forwarded-Host");

  if (
    isProduction &&
    requestedHost &&
    !requestedHost.match(/2023.knighthacks.org/)
  ) {
    const host = `2023.knighthacks.org`; // set your main domain

    const requestedPort = req.headers.get("X-Forwarded-Port");
    const requestedProto = req.headers.get("X-Forwarded-Proto");

    url.host = host;
    url.protocol = requestedProto || url.protocol;
    url.port = requestedPort || url.port;

    return NextResponse.redirect(url);
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const encryptedOAuthAccessToken = req.cookies.get(
    "encryptedOAuthAccessToken"
  );

  console.log("processing: ", req.url);

  // Print all headers
  console.log(req.headers);

  // No refresh token -> invaldiate access token
  if ((!refreshToken || isTokenExpired(refreshToken)) && accessToken) {
    const response = NextResponse.redirect(new URL(req.url, req.url));

    response.cookies.set({
      name: "accessToken",
      value: "",
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      path: "/",
    });
    response.cookies.set({
      name: "refreshToken",
      value: "",
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  }

  // Access token expired -> get new access token
  if (
    (!accessToken || isTokenExpired(accessToken)) &&
    refreshToken &&
    !isTokenExpired(refreshToken)
  ) {
    const { data, errors } = await getNewAccessToken(refreshToken);

    if (errors) {
      return NextResponse.redirect(new URL("/ ", req.url));
    }

    const response = NextResponse.redirect(new URL(req.url, req.url));
    response.cookies.set({
      name: "accessToken",
      value: data.refreshJWT,
      expires: new Date(Date.now() + 1000 * 60 * 30),
      httpOnly: true,
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
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/apply")) &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/register") &&
    !encryptedOAuthAccessToken
  ) {
    console.log("This stupid shit is happening");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/signin") && encryptedOAuthAccessToken) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico|auth_redirect).*)",
  ],
};

const getNewAccessToken = async (refreshToken: string) => {
  const query = `
query Query($refreshToken: String!) {
  refreshJWT(refreshToken: $refreshToken)
}
  `;

  const variables = {
    refreshToken,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    credentials: "include",
  });

  return res.json();
};