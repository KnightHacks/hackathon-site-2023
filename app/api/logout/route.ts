import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().set({
    name: "accessToken",
    value: "",
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });
  cookies().set({
    name: "refreshToken",
    value: "",
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "http://localhost:3000/",
    },
  });
}
