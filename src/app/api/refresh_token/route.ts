import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  // const payload = await req.json();
  // console.log("Hello, World!");
  const { data, errors } = await refreshToken("");

  if (errors) {
    return new Response("Error refreshing token", {
      status: 500,
    });
  }

  const response = new NextResponse("Success!", {
    status: 200,
  });

  response.cookies.set({
    name: "accessToken",
    value: data.refreshJWT,
    expires: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
  });

  response;
}

const refreshToken = async (token: string) => {
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
        token,
      },
    }),
    credentials: "include",
  });

  return res.json();
};
