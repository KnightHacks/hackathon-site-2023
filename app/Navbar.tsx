import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ManageAccountButton from "./ManageAccountButton";
import MobileDropdown from "./MobileDropdown";
import ScrollToButton from "./ScrollToButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 flex h-16 w-full items-center justify-between border-b bg-white px-6 font-serif">
      <div className="flex">
        <MobileDropdown />
        <ScrollToButton
          elementId="#main"
          className="text-left font-bold leading-4"
        >
          <Image
            width={35}
            height={35}
            src="/black_dragon_logo.svg"
            alt="KnightHacks logo"
          />
        </ScrollToButton>
      </div>
      <ul className="hidden gap-4 font-medium md:flex">
        <li>
          <ScrollToButton elementId="#about">About</ScrollToButton>
        </li>
        <li>
          <ScrollToButton elementId="#guide">Guide</ScrollToButton>
        </li>
        <li>
          <ScrollToButton elementId="#faq">FAQ</ScrollToButton>
        </li>
        <li>
          <ScrollToButton elementId="#sponsors">Sponsors</ScrollToButton>
        </li>
      </ul>
      {/* @ts-expect-error Async Server Component */}
      <NavButton />
    </nav>
  );
}

async function NavButton() {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    const getUserInfo = async () => {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: `
query Query {
  me {
    firstName
  }
}        
        `,
        }),
        credentials: "include",
      });

      return await res.json();
    };

    const userPayload = await getUserInfo();
    console.log(userPayload);

    return (
      <ManageAccountButton userFirstName={userPayload.data.me.firstName} />
    );
  } else if (cookies().get("encryptedOAuthAccessToken")) {
    return (
      <Link
        href="/register"
        className="border-black bg-black px-4 py-2 font-bold text-white"
      >
        Register
      </Link>
    );
  }

  return (
    <Link
      href="/signin"
      className="border-black bg-black px-4 py-2 font-bold text-white"
    >
      Sign In
    </Link>
  );
}
