"use client";

import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function ManageAccountButton({
  userFirstName,
}: {
  userFirstName: string;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger>Welcome, {userFirstName}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="mr-6 mt-2 flex w-48 flex-col border bg-white p-2 font-serif">
          <Link
            href="/dashboard"
            className="px-4 py-2 text-center hover:bg-black hover:text-white"
          >
            Dashboard
          </Link>
          <SignOutButton />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
