"use client";

import { useRouter } from "next/navigation";
import { DiscordIcon, GitHubIcon, GoogleIcon } from "../../components/Icons";

export function GithubSignIn() {
  const router = useRouter();

  return (
    <button
      className="flex gap-3 whitespace-nowrap border border-transparent bg-[#333] px-4 py-3 text-white"
      onClick={async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            query: `
              query Query($provider: Provider!, $redirect: String) {
                getAuthRedirectLink(provider: $provider, redirect: $redirect)
              }
            `,
            variables: {
              provider: "GITHUB",
              redirect: "http://localhost:3000/auth_redirect",
            },
          }),
        });

        if (!res.ok) {
          alert("Something went wrong!");
          return;
        }

        const { data } = await res.json();

        router.push(data.getAuthRedirectLink);
      }}
    >
      <GitHubIcon />
      <span className="mx-auto">Sign in with GitHub</span>
    </button>
  );
}

export function DiscordSignIn() {
  return (
    <button className="flex gap-3 whitespace-nowrap border border-transparent bg-[#5865F2] px-4 py-3 text-white">
      <DiscordIcon />
      <span className="mx-auto">Sign in with Discord</span>
    </button>
  );
}

export function GoogleSignIn() {
  return (
    <button className="flex gap-3 whitespace-nowrap border border-transparent bg-red-500 px-4 py-3 text-white">
      <GoogleIcon />
      <span className="mx-auto">Sign in with Google</span>
    </button>
  );
}
