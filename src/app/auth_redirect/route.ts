import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const { data, errors } = await login(code, state);

  if (errors) {
    const response = new NextResponse("Error logging in", {
      status: 500,
    });

    response.cookies.delete("oauthstate");

    return response;
  }

  if (!data.login.accountExists) {
    const response = new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/register",
      },
    });

    response.cookies.delete("oauthstate");

    response.cookies.set({
      name: "encryptedOAuthAccessToken",
      value: data.login.encryptedOAuthAccessToken,
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: true,
      path: "/",
    });

    return response;
  }

  const response = new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });

  response.cookies.set({
    name: "accessToken",
    value: data.login.accessToken,
    expires: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
    path: "/",
  });

  response.cookies.set({
    name: "refreshToken",
    value: data.login.refreshToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    path: "/",
  });

  response.cookies.delete("oauthstate");

  return response;
}

async function login(code: string, state: string) {
  const oAuthState = cookies().get("oauthstate");

  if (!oAuthState) {
    return new NextResponse("No oauthstate cookie", {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `oauthstate=${oAuthState.value}`,
    },
    credentials: "include",
    body: JSON.stringify({
      query: `
    query Login($code: String!, $provider: Provider!, $state: String!) {
      login(code: $code, provider: $provider, state: $state) {
        accessToken
        accountExists
        encryptedOAuthAccessToken
        refreshToken
      }
    }
  `,
      variables: {
        code,
        state,
        provider: "GITHUB",
      },
    }),
  });

  return res.json();
}
