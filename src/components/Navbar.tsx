import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <nav className="flex items-center h-20 px-8">
      <Bars3Icon className="w-7 h-7 mr-4" />
      <div>KnightHacks</div>
      <div></div>
    </nav>
  );
}
