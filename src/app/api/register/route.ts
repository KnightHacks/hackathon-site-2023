import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const encryptedOAuthAccessToken = cookies().get(
    "encryptedOAuthAccessToken"
  )?.value;

  if (!encryptedOAuthAccessToken) {
    return new NextResponse("No OAuth access token", {
      status: 400,
    });
  }

  const registrationPayload = await req.json();
  const { data, errors } = await register({
    encryptedOAuthAccessToken,
    data: registrationPayload,
    provider: "GITHUB",
  });

  if (errors) {
    return new NextResponse("Error registering", {
      status: 500,
    });
  }

  const response = new NextResponse("Success!", {
    status: 200,
  });

  cookies().set({
    name: "accessToken",
    value: data.register.accessToken,
    expires: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
    path: "/",
    secure: true,
  });

  cookies().set({
    name: "refreshToken",
    value: data.register.refreshToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    path: "/",
    secure: true,
  });

  cookies().set({
    name: "encryptedOAuthAccessToken",
    value: "",
    expires: new Date("2016-10-05"),
    path: "/",
  });

  return response;
}

async function register({
  encryptedOAuthAccessToken,
  data,
  provider,
}: {
  encryptedOAuthAccessToken: string;
  data: FieldValues;
  provider: string;
}) {
  const query = `
mutation Mutation($encryptedOAuthAccessToken: String!, $input: NewUser!, $provider: Provider!) {
  register(encryptedOAuthAccessToken: $encryptedOAuthAccessToken, input: $input, provider: $provider) {
    accessToken
    refreshToken
  }
}
`;

  const variables = {
    encryptedOAuthAccessToken,
    input: {
      shirtSize: data.shirtSize,
      mlh: {
        shareInfo: true,
        codeOfConduct: true,
        sendMessages: true,
      },
      phoneNumber: data.phoneNumber,
      mailingAddress: {
        addressLines: [data.addressLine1, data.addressLine2],
        city: data.city,
        state: data.state,
        postalCode: data.zipCode,
        country: data.country,
      },
      pronouns: {
        subjective: "",
        objective: "",
      },
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      educationInfo: {
        name: data.schoolName,
        major: data.major,
        graduationDate: new Date(0),
      },
      age: data.age,
      race: data.race,
    },
    provider,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return res.json();
}
