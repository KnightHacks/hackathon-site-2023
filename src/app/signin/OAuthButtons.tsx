"use client";

import { useRouter } from "next/navigation";
import { DiscordIcon, GitHubIcon, GoogleIcon } from "../../components/Icons";
import { Toast } from "../../components/Toast";
import { HTMLAttributes,  useState } from "react";

export function OAuthButtons() {
  const [toastState, setToastState] = useState({
    open: false,
    title: "",
    description: "",
  });

  return (
    <>
      <div className="flex max-w-fit flex-col gap-2">
        <GithubSignIn />
        <DiscordSignIn
          onClick={() => {
            setToastState({
              open: true,
              title: "Coming Soon",
              description: "Discord sign in is coming soon!",
            });
          }}
        />
        <GoogleSignIn
          onClick={() => {
            setToastState({
              open: true,
              title: "Coming Soon",
              description: "Google sign in is coming soon!",
            });
          }}
        />
      </div>
      <Toast
        open={toastState.open}
        setOpen={() =>
          setToastState((toastState) => {
            return {
              ...toastState,
              open: !toastState.open,
            };
          })
        }
        title={toastState.title}
        description={toastState.description}
      />
    </>
  );
}

interface OAuthButtonProps extends HTMLAttributes<HTMLButtonElement> {}
function GithubSignIn(props: OAuthButtonProps) {
  const router = useRouter();

  return (
    <button
      {...props}
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
              redirect: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL,
            },
          }),
        });

        if (!res.ok) {
          alert("Something went wrong!");
          return;
        }

        const { data } = await res.json();
        console.log(data);

        router.push(data.getAuthRedirectLink);  
      }}
    >
      <GitHubIcon />
      <span className="mx-auto">Sign in with GitHub</span>
    </button>
  );
}

function DiscordSignIn(props: OAuthButtonProps) {
  return (
    <button
      {...props}
      className="flex gap-3 whitespace-nowrap border border-transparent bg-[#5865F2] px-4 py-3 text-white"
    >
      <DiscordIcon />
      <span className="mx-auto">Sign in with Discord</span>
    </button>
  );
}

function GoogleSignIn(props: OAuthButtonProps) {
  return (
    <button
      {...props}
      className="flex gap-3 whitespace-nowrap border border-transparent bg-red-500 px-4 py-3 text-white"
    >
      <GoogleIcon />
      <span className="mx-auto">Sign in with Google</span>
    </button>
  );
}
