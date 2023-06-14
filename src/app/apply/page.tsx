import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import KnightHacksRegistrationForm from "./Form";

export const metadata = {
  title: "Registration",
};

export default function KnightHacksRegistration() {
  return (
    <div className="mx-auto my-10 w-full max-w-screen-md px-6">
      <KnightHacksRegistrationForm />
    </div>
  );
}
