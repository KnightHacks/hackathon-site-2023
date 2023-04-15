import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 flex h-20 w-full items-center bg-white px-4 shadow">
      <button className="mr-4">
        <Bars3Icon className="h-7 w-7" />
      </button>
      <Link className="font-bold leading-4" href="/">
        Knight <br /> Hacks
      </Link>
      <button className="ml-auto border-black bg-black px-4 py-2 font-bold text-white">
        Register
      </button>
    </nav>
  );
}
