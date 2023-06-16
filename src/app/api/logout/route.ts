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

  cookies().set({
    name: "refreshToken",
    value: "",
    expires: new Date(Date.now() - 1000 * 60 * 300),
    httpOnly: true,
    secure: true,
    path: "/",
  });
  cookies().set({
    name: "accessToken",
    value: "",
    expires: new Date(Date.now() - 1000 * 60 * 300),
    httpOnly: true,
    secure: true,
    path: "/",
  }); 

  return new NextResponse("Logged out", {
    status: 200,
  });
}
