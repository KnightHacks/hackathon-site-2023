import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileDropdown from "./MobileDropdown";

export default function Navbar() {
  const { pathname } = useRouter();

  const scrollTo = (id: string) => {
    const element: HTMLElement = document.querySelector(id)!;
    window?.scrollTo({ behavior: "smooth", top: element.offsetTop - 100 });
  };

  return (
    <nav className="fixed top-0 flex h-20 w-full items-center justify-between bg-white px-6 shadow">
      <div className="flex">
        {pathname === "/" ? (
          <>
            <MobileDropdown />
            <button
              onClick={() => scrollTo("#main")}
              className="text-left font-bold leading-4"
            >
              <Image
                width={150}
                height={150}
                src="/gold_dragon_full_logo.png"
                alt="KnightHacks logo"
              />
            </button>
          </>
        ) : (
          <Link href="/" className="font-bold leading-4">
            <Image
              width={150}
              height={150}
              src="/gold_dragon_full_logo.png"
              alt="KnightHacks logo"
            />
          </Link>
        )}
      </div>
      {pathname === "/" && (
        <ul className="hidden gap-4 font-bold sm:flex">
          <li>
            <button onClick={() => scrollTo("#about")}>About</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#faq")}>FAQ</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#schedule")}>Schedule</button>
          </li>
          <li>
            <button onClick={() => scrollTo("#sponsors")}>Sponsors</button>
          </li>
        </ul>
      )}
      {pathname === "/" ? (
        <Link
          href="/register"
          className=" border-black bg-black px-4 py-2 font-bold text-white"
        >
          Register
        </Link>
      ) : (
        <Link className="flex items-center font-bold" href="/">
          <span className="mr-1">Back to live site</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
