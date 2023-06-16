import { Input } from "@/components/Fields";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import EditInfoForm from "./Form";

export const runtime = "edge";

export const metadata = {
  title: "Dashboard",
};

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

  const res = await fetch("http://localhost:4000/", {
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

export default async function Dashboard() {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) redirect("/sigin");

  const { data } = await getUser(accessToken);
  console.log(data);

  if (!data) {
    redirect("/");
  }

  return (
    <div className="mx-auto my-10 w-full max-w-screen-md px-6">
      <EditInfoForm user={data.me} />
    </div>
  );
}
