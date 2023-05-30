import { cookies } from "next/headers";
import KnightHacksRegistrationForm from "./Form";

export default function KnightHacksRegistration() {
  const accessToken = cookies().get("accessToken")?.value || "";

  if (!accessToken) {
    // return redirect("/signin");
  }

  return (
    <div className="mx-auto my-10 w-full max-w-screen-md px-6">
      <KnightHacksRegistrationForm />
    </div>
  );
}
