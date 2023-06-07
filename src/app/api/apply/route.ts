import { NextRequest, NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return new NextResponse("No access token", {
      status: 400,
    });
  }

  const applicationPayload = await req.json();
  const { data, errors } = await apply({
    accessToken,
    data: applicationPayload,
  });
}

const apply = async ({
  accessToken,
  data,
}: {
  accessToken: string;
  data: FieldValues;
}) => {
  const query = `
mutation ApplyToHackathon($hackathonId: ID!, $input: HackathonApplicationInput!) {
  applyToHackathon(hackathonId: $hackathonId, input: $input)
}    
    `;

  const variables = {
    hackathonId: 1,
    input: {
      whyAttend: data.whyAttend,
      whatLearn: data.whatLearn,
      shareInfo: data.shareInfo,
    },
  };

  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
};
