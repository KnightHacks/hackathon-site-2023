import { cinzel } from "@/utils";
import { DiscordIcon, GitHubIcon, GoogleIcon } from "../components/icons";

export default function login() {
  return (
    <div className="mx-auto mb-10 mt-28 w-full max-w-screen-md px-6">
      <div className="text-left text-4xl font-bold uppercase" style={cinzel.style}>Sign In</div>
      <p className="mb-4">Sign in using any of the services below</p>
      <div className="flex flex-col gap-2 max-w-fit">
        <DiscordSignIn />
        <GithubSignIn />
        <GoogleSignIn />
      </div>
    </div>
  );
}

function DiscordSignIn() {
  return (
    <button className="flex gap-3 border border-transparent bg-[#5865F2] px-4 py-3 text-white">
      <DiscordIcon />
      <span className="mx-auto">Sign in with Discord</span>
    </button>
  );
}

function GithubSignIn() {
  return (
    <button className="flex gap-3 border border-transparent bg-[#333] px-4 py-3 text-white">
      <GitHubIcon />
      <span className="mx-auto">Sign in with GitHub</span>
    </button>
  );
}

function GoogleSignIn() {
  return (
    <button className="flex gap-3 border border-transparent bg-red-500 px-4 py-3 text-white">
      <GoogleIcon />
      <span className="mx-auto">Sign in with Google</span>
    </button>
  );
}
