import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return new NextResponse("Already logged out", {
      status: 200,
    });
  }

  const response = new NextResponse("Logged out", {
    status: 200,
  });

  cookies().set({
    name: "accessToken",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  cookies().set({
    name: "refreshToken",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;
}
