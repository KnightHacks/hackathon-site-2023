"use client";

import Image from "next/image";
import Link from "next/link";
import { cinzel, scrollTo } from "../lib/utils";

export function MainSection() {
  return (
    <section
      id="main"
      className="mx-auto flex min-h-screen flex-col items-center justify-center"
      style={cinzel.style}
    >
      <Image
        className="mx-auto mb-4"
        width={640 * 0.9}
        height={640 * 0.9}
        src="/black_dragon_full_logo.svg"
        alt="KnightHacks logo"
      />
      <div className="mb-8 text-2xl">October 6-8</div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Link
          href="/register"
          className="border border-black bg-black py-3 text-center font-bold text-white"
        >
          Register
        </Link>
        <button
          className="border border-black py-3 text-center font-bold"
          role="link"
          onClick={() => scrollTo("#sponsors")}
        >
          Sponsors
        </button>
        <Link
          className="border border-black py-3 text-center font-bold"
          href="https://discord.gg/Kv5g9vf"
        >
          Discord
        </Link>
      </div>
    </section>
  );
}
