import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "http://localhost:3000/",
      },
    });
  }

  const { data, errors } = await login(code, state);

  cookies().set({
    name: "oauthstate",
    value: "",
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });

  console.log(data);

  if (errors || !data) {
    return new Response("Error logging in", {
      status: 500,
    });
  }

  if (!data.login.accountExists) {
    cookies().set(
      "encryptedOAuthAccessToken",
      data.login.encryptedOAuthAccessToken
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "http://localhost:3000/register",
      },
    });
  }

  cookies().set({
    name: "accessToken",
    value: data.login.accessToken,
    expires: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
    path: "/",
  });

  cookies().set({
    name: "refreshToken",
    value: data.login.refreshToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    path: "/",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "http://localhost:3000/",
    },
  });
}

async function login(code: string, state: string) {
  const oAuthState = cookies().get("oauthstate");

  if (!oAuthState) {
    return new Response("No oauthstate cookie", {
      status: 500,
    });
  }

  const res = await fetch("http://localhost:4000/", {
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
