import { NextRequest, NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return new NextResponse("No access token", {
      status: 400,
    });
  }

  const updateUserPayload = await req.json();
  console.log(updateUserPayload)
  const { errors } = await updateUser({
    accessToken,
    data: updateUserPayload,
  });

  console.log(errors)

  if (errors) {
    return new NextResponse("Error updating user", {
      status: 500,
    });
  }

  const response = new NextResponse("Success!", {
    status: 200,
  });

  return response;
}

async function updateUser({
  accessToken,
  data,
}: {
  accessToken: string;
  data: FieldValues;
}) {
  const query = `
mutation Mutation($updateUserId: ID!, $input: UpdatedUser!) {
  updateUser(id: $updateUserId, input: $input) {
    id
  }
}      
    `;

  const variables = {
    updateUserId: data.userId,
    input: {
      shirtSize: data.shirtSize,
      mlh: {
        shareInfo: true,
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
    },
  };

  console.log(JSON.stringify(variables))

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
}
