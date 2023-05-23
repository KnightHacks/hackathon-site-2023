import Link from "next/link";
import { DiscordIcon, GitHubIcon, InstagramIcon } from "../lib/icons";

export default function Footer() {
  return (
    <footer className="mb-4 mt-auto flex flex-col items-center">
      <ul className="mb-2 flex gap-3">
        <li>
          <Link href="https://github.com/KnightHacks" target="_blank">
            <GitHubIcon />
          </Link>
        </li>
        <li>
          <Link href="https://instagram.com/knighthacks" target="_blank">
            <InstagramIcon />
          </Link>
        </li>
        <li>
          <Link href="https://discord.gg/Kv5g9vf" target="_blank">
            <DiscordIcon />
          </Link>
        </li>
      </ul>
      <p className="mb-2">Made with ❤️ by KnightHacks</p>
    </footer>
  );
}
