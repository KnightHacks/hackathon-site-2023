import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegistrationForm from "./Form";

export default function Register() {
  const encryptedOAuthAccessToken =
    cookies().get("encryptedOAuthAccessToken")?.value || "";
  if (cookies().get("accessToken")) {
    return redirect("/dashboard");
  }

  if (!cookies().get("encryptedOAuthAccessToken")) {
    return redirect("/signin");
  }

  return (
    <div className="mx-auto my-10 w-full max-w-screen-md px-6">
      <RegistrationForm encryptedOAuthAccessToken={encryptedOAuthAccessToken} />
    </div>
  );
}
