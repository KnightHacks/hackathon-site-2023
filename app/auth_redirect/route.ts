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
    // @ts-ignore
    httpOnly: true,
    path: "/",
  });
  cookies().set({
    name: "refreshToken",
    value: data.login.refreshToken,
    // @ts-ignore
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
  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `oauthstate=${cookies().get("oauthstate")?.value}`,
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

  return await res.json();
}
