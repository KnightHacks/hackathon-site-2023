import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HackathonRegistrationForm from "./Form";

export default function KnightHacksAccountRegistration() {
  const encryptedOAuthAccessToken = cookies().get("encryptedOAuthAccessToken");

  if (!encryptedOAuthAccessToken) {
    // return redirect("/signin");
  }

  return (
    <div className="mx-auto my-10 w-full max-w-screen-md px-6">
      <HackathonRegistrationForm />
    </div>
  );
}
