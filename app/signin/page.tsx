"use client";

import { } from "@apollo/experimental-nextjs-app-support/ssr";
import { useRouter } from "next/navigation";
import { DiscordIcon, GitHubIcon, GoogleIcon } from "../lib/icons";
import { cinzel } from "../lib/utils";

export default function SignIn() {
  return (
    <div className="mx-auto mb-10 mt-28 w-full max-w-screen-md px-6">
      <div
        className="text-left text-4xl font-bold uppercase"
        style={cinzel.style}
      >
        Sign In
      </div>
      <p className="mb-4">Sign in using any of the services below</p>
      <div className="flex max-w-fit flex-col gap-2">
        <GithubSignIn />
        <DiscordSignIn />
        <GoogleSignIn />
      </div>
    </div>
  );
}

function GithubSignIn() {
  const router = useRouter();

  return (
    <button
      className="flex gap-3 whitespace-nowrap border border-transparent bg-[#333] px-4 py-3 text-white"
      onClick={async () => {
        const { data } = await fetch("http://localhost:4000/", {
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
            },
          }),
        }).then((res) => {
          return res.json();
        });

        router.push(data.getAuthRedirectLink);
      }}
    >
      <GitHubIcon />
      <span className="mx-auto">Sign in with GitHub</span>
    </button>
  );
}

function DiscordSignIn() {
  return (
    <button className="flex gap-3 whitespace-nowrap border border-transparent bg-[#5865F2] px-4 py-3 text-white">
      <DiscordIcon />
      <span className="mx-auto">Sign in with Discord</span>
    </button>
  );
}

function GoogleSignIn() {
  return (
    <button className="flex gap-3 whitespace-nowrap border border-transparent bg-red-500 px-4 py-3 text-white">
      <GoogleIcon />
      <span className="mx-auto">Sign in with Google</span>
    </button>
  );
}
