import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

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

  if (errors) {
    return new NextResponse("Error applying to hackathon", {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}

const apply = async ({
  accessToken,
  data,
}: {
  accessToken: string;
  data: FieldValues;
}) => {
  const {
    data: { currentHackathon },
    errors,
  } = await getCurrentHackathon();

  if (errors) {
    return new NextResponse("Error getting current hackathon", {
      status: 500,
    });
  }

  const query = `
mutation ApplyToHackathon($hackathonId: ID!, $input: HackathonApplicationInput!) {
  applyToHackathon(hackathonId: $hackathonId, input: $input)
}    
    `;

  const variables = {
    hackathonId: currentHackathon.id,
    input: {
      whyAttend: data.whyAttend,
      whatLearn: data.whatLearn,
      shareInfo: data.shareInfo,
    },
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
};

const getCurrentHackathon = async () => {
  const query = `
query CurrentHackathon {
  currentHackathon {
    id
  }
}
`;

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return res.json();
};
