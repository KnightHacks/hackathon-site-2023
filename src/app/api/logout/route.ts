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

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}
