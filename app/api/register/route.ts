import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export async function POST(req: Request) {
  const encryptedOAuthAccessToken = cookies().get(
    "encryptedOAuthAccessToken"
  )?.value;

  if (!encryptedOAuthAccessToken) {
    return new Response("No OAuth access token", {
      status: 400,
    });
  }

  console.log(encryptedOAuthAccessToken);

  const registrationPayload = JSON.parse(await req.text());
  const { data, errors } = await register({
    encryptedOAuthAccessToken,
    input: registrationPayload,
    provider: "GITHUB",
  });

  console.log(errors);

  if (errors || !data) {
    return new Response("Error registering", {
      status: 500,
    });
  }

  cookies().set({
    name: "accessToken",
    value: data.register.accessToken,
    expires: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
    path: "/",
  });

  cookies().set({
    name: "refreshToken",
    value: data.register.refreshToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    path: "/",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/dashboard",
    },
  });
}

async function register({
  encryptedOAuthAccessToken,
  input,
  provider,
}: {
  encryptedOAuthAccessToken: string;
  input: FieldValues;
  provider: string;
}) {
  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
mutation Mutation($encryptedOAuthAccessToken: String!, $input: NewUser!, $provider: Provider!) {
  register(encryptedOAuthAccessToken: $encryptedOAuthAccessToken, input: $input, provider: $provider) {
    accessToken
    refreshToken
  }
}
      `,
      variables: {
        encryptedOAuthAccessToken,
        input: {
          shirtSize: input.shirtSize,
          mlh: {
            shareInfo: true,
            codeOfConduct: true,
            sendMessages: true,
          },
          phoneNumber: input.phoneNumber,
          mailingAddress: {
            addressLines: [input.addressLine1, input.addressLine2],
            city: input.city,
            state: input.state,
            postalCode: input.zipCode,
            country: input.country,
          },
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          educationInfo: {
            name: input.schoolName,
            major: input.major,
            graduationDate: new Date(0),
          },
          age: input.age,
        },
        provider,
      },
    }),
  });

  return res.json();
}
