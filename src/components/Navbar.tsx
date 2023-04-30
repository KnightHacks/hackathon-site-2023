import Link from "next/link";
import MobileDropdown from "./MobileDropdown";

export default function Navbar() {
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
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/">FAQ</Link>
        </li>
        <li>
          <Link href="/">Schedule</Link>
        </li>
        <li>
          <Link href="/">Sponsors</Link>
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
