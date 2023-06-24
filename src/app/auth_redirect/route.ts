import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const oAuthState = cookies().get("oauthstate");
  if (!oAuthState) {
    console.log("No auth state found");
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  console.log(oAuthState);

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

  const { data, errors } = await login(code, state, oAuthState!.value);

  console.log("login payload: ", data, errors);

  if (errors) {
    const response = new NextResponse("Error logging in", {
      status: 302,
      headers: {
        Location: "/",
      },
    });

    cookies().set({
      name: "oauthstate",
      value: "",
      expires: new Date("2016-10-05"),
      path: "/",
    });

    return response;
  }

  if (!data.login.accountExists) {
    const response = new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/register",
      },
    });

    cookies().set({
      name: "encryptedOAuthAccessToken",
      value: data.login.encryptedOAuthAccessToken,
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: true,
      secure: true,
      path: "/",
    });

    cookies().set({
      name: "oauthstate",
      value: "",
      expires: new Date("2016-10-05"),
      path: "/",
    });

    console.log("success! redirecting to register");
    return response;
  }

  const response = new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });

  cookies().set({
    name: "accessToken",
    value: data.login.accessToken,
    expires: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
    secure: true,
    path: "/",
  });

  cookies().set({
    name: "refreshToken",
    value: data.login.refreshToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    secure: true,
    path: "/",
  });

  cookies().set({
    name: "oauthstate",
    value: "",
    expires: new Date(Date.now()),
    path: "/",
  });

  console.log("logging in user:   ", data.login.accessToken);

  return response;
}

async function login(code: string, state: string, oAuthState: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `oauthstate=${oAuthState}`,
    },
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
