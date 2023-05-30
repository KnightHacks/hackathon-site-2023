import { cookies } from "next/headers";

export default async function GET(req: Request) {
  const { refreshToken } = JSON.parse(await req.text());
  const query = `
query Query($refreshToken: String!) {
  refreshJWT(refreshToken: $refreshToken)
}
  `;

  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        refreshToken,
      },
    }),
    credentials: "include",
  });

  const { data, errors } = await res.json();

  if (errors || !data) {
    return new Response("Error refreshing token", {
      status: 500,
    });
  }

  cookies().set({
    name: "accessToken",
    value: data.refreshJWT,
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 30),
  });

  return new Response("Success", {
    status: 200,
  });
}
