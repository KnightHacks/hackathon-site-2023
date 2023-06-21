import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import KnightHacksRegistrationForm from "./Form";

export const metadata = {
  title: "Registration",
};

export const runtime = "edge";

const getUser = async (accessToken: string) => {
  const query = `
query Me {
  me {
    id
    firstName
    lastName
    age
    gender
    shirtSize
    race
    phoneNumber
    mailingAddress {
      state
      postalCode
      country
      city
      addressLines
    }
    educationInfo {
      major
      name
      level
      graduationDate
    }
    email
    applications {
      whyAttend
      whatDoYouWantToLearn
      status
    }
  }
}
  `;

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
    }),
  });

  return res.json();
};

export default async function KnightHacksRegistration() {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) redirect("/sigin");

  const { data } = await getUser(accessToken);

  return (
    <div className="mx-auto my-10 w-full max-w-screen-md px-6">
      {data.applications.length > 0 ? (
        <>
          <div className="font-serif text-4xl font-bold">Thank you!</div>
          <p className="mb-4">You&apos;ve already applied!</p>
        </>
      ) : (
        <KnightHacksRegistrationForm />
      )}
    </div>
  );
}
