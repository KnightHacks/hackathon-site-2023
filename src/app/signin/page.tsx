import { Toast } from "@/components/Toast";
import { OAuthButtons } from "./OAuthButtons";

export const metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="mx-auto mb-10 mt-24 w-full max-w-screen-md px-6">
      <div className="text-left font-serif text-4xl font-bold uppercase">
        Sign In
      </div>
      <p className="mb-4">Sign in using any of the services below</p>
      <OAuthButtons />
    </div>
  );
}
