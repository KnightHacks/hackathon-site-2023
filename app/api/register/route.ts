import { Fields } from "@/register/Form";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const registerPayload = JSON.parse(await req.text());
  console.log(registerPayload);
  const { data, errors } = await register(registerPayload);

  console.log({
    data,
    errors,
  });

  if (errors || !data) {
    return new Response("Error registering", {
      status: 500,
    });
  }

  cookies().set({
    name: "accessToken",
    value: data.register.accessToken,
    // @ts-ignore
    httpOnly: true,
    path: "/",
  });

  cookies().set({
    name: "refreshToken",
    value: data.register.refreshToken,
    // @ts-ignore
    httpOnly: true,
    path: "/",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "http://localhost:3000/dashboard",
    },
  });
}

async function register({
  encryptedOAuthAccessToken,
  input,
  provider,
}: {
  encryptedOAuthAccessToken: string;
  input: Fields;
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
          educationInfo: {
            name: input.school,
            major: input.major,
          },
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          mlh: {
            codeOfConduct: input.hasReadMLHCodeOfConduct,
            sendMessages: input.isSubscribedToMLHNewsletter,
            shareInfo: input.isComfortableSharingInfo,
          },
          phoneNumber: input.phoneNumber,
          yearsOfExperience: 0,
        },
        provider,
      },
    }),
  });

  return res.json();
}
