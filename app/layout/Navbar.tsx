"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cinzel, scrollTo } from "../lib/utils";
import MobileDropdown from "./MobileDropdown";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 flex h-16 w-full items-center justify-between border-b bg-white px-6"
      style={cinzel.style}
    >
      <div className="flex">
        {pathname === "/" ? (
          <>
            <MobileDropdown />
            <button
              onClick={() => scrollTo("#main")}
              className="text-left font-bold leading-4"
            >
              <Image
                width={35}
                height={35}
                src="/black_dragon_logo.svg"
                alt="KnightHacks logo"
              />
            </button>
          </>
        ) : (
          <Link href="/" className="font-bold leading-4">
            <Image
              width={35}
              height={35}
              src="/black_dragon_logo.svg"
              alt="KnightHacks logo"
            />
          </Link>
        )}
      </div>
      {pathname === "/" && (
        <ul className="hidden gap-4 font-medium md:flex">
          <li>
            <button onClick={() => scrollTo("#main")}>Home</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#about")}>About</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#faq")}>FAQ</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#guide")}>Guide</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#sponsors")}>Sponsors</button>
          </li>
        </ul>
      )}
      {pathname === "/" ? (
        <Link
          href="/signin"
          className=" border-black bg-black px-4 py-2 font-bold text-white"
        >
          Sign In
        </Link>
      ) : (
        <Link className="flex items-center font-bold" href="/">
          <span className="mr-1">Back</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
