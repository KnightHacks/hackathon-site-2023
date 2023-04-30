import Link from "next/link";
import MobileDropdown from "./MobileDropdown";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const element: HTMLElement = document.querySelector(id)!;
    window?.scrollTo({ behavior: "smooth", top: element.offsetTop - 100 });
  }

  return (
    <nav className="fixed top-0 flex h-20 w-full items-center justify-between bg-white px-4 shadow">
      <div className="flex">
        <MobileDropdown />
        <Link href="/" className="font-bold leading-4">
          Knight <br /> Hacks
        </Link>
      </div>
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
      <Link
        href="/register"
        className=" border-black bg-black px-4 py-2 font-bold text-white"
      >
        Register
      </Link>
    </nav>
  );
}
