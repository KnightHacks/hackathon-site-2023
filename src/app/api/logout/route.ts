import { NextResponse } from "next/server";

export async function POST() {
  const response = new NextResponse(null, {
    status: 200,
  });

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}
