"use client";
import { GearIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import * as NavMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { match } from "ts-pattern";
import { UserState, scrollToElementById } from "../utils";
import { BlackDragonLogo } from "./Logos";

export default function Navbar({ userState }: { userState: UserState }) {
  return (
    <NavMenu.Root>
      <NavMenu.List className="fixed top-0 flex h-16 w-full items-center justify-between bg-white px-6 font-serif text-lg shadow">
        <div className="flex items-center">
          <NavMenu.Item className="relative md:hidden">
            <NavMenu.Trigger className="mr-3 flex items-center justify-between p-1.5 ">
              <HamburgerMenuIcon className="h-6 w-6" />
            </NavMenu.Trigger>
            <NavMenu.Content className="absolute top-10 w-[200px] border bg-white p-2">
              <ul>
                <li>
                  <NavMenu.Link asChild>
                    <button
                      className="w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                      onClick={() => {
                        scrollToElementById("about");
                      }}
                    >
                      About
                    </button>
                  </NavMenu.Link>
                </li>
                <li>
                  <NavMenu.Link asChild>
                    <button
                      className="w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                      onClick={() => {
                        scrollToElementById("guide");
                      }}
                    >
                      Guide
                    </button>
                  </NavMenu.Link>
                </li>
                <li>
                  <NavMenu.Link asChild>
                    <button
                      className="w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                      onClick={() => {
                        scrollToElementById("faq");
                      }}
                    >
                      FAQ
                    </button>
                  </NavMenu.Link>
                </li>
                <li>
                  <NavMenu.Link asChild>
                    <button
                      className="w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                      onClick={() => {
                        scrollToElementById("sponsors");
                      }}
                    >
                      Sponsors
                    </button>
                  </NavMenu.Link>
                </li>
              </ul>
            </NavMenu.Content>
          </NavMenu.Item>
          <NavMenu.Item>
            <NavMenu.Link asChild>
              <button
                onClick={() => scrollToElementById("main")}
                className="flex items-center text-left font-bold leading-4"
              >
                <BlackDragonLogo className="h-9 w-9" />
              </button>
            </NavMenu.Link>
          </NavMenu.Item>
        </div>
        <NavMenu.Item>
          <ul className="hidden gap-4 font-medium md:flex">
            <li>
              <NavMenu.Link asChild>
                <button
                  onClick={() => {
                    scrollToElementById("about");
                  }}
                >
                  About
                </button>
              </NavMenu.Link>
            </li>
            <li>
              <NavMenu.Link asChild>
                <button
                  onClick={() => {
                    scrollToElementById("guide");
                  }}
                >
                  Guide
                </button>
              </NavMenu.Link>
            </li>
            <li>
              <NavMenu.Link asChild>
                <button
                  onClick={() => {
                    scrollToElementById("faq");
                  }}
                >
                  FAQ
                </button>
              </NavMenu.Link>
            </li>
            <li>
              <NavMenu.Link asChild>
                <button
                  onClick={() => {
                    scrollToElementById("sponsors");
                  }}
                >
                  Sponsors
                </button>
              </NavMenu.Link>
            </li>
          </ul>
        </NavMenu.Item>
        <NavMenu.Item className="relative">
          {match(userState)
            .with("User", () => (
              <>
                <NavMenu.Trigger className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </NavMenu.Trigger>
                <NavMenu.Content className="absolute right-0 top-10 w-[200px] border bg-white p-2">
                  <ul>
                    <li>
                      <NavMenu.Link
                        className="block w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                        asChild
                      >
                        <Link href="/apply">Apply</Link>
                      </NavMenu.Link>
                    </li>
                    <li>
                      <NavMenu.Link
                        className="block w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                        asChild
                      >
                        <Link href="/dashboard">Dashboard</Link>
                      </NavMenu.Link>
                    </li>
                    <li>
                      <NavMenu.Link asChild>
                        <button
                          onClick={async () => {
                            await fetch("/api/logout", {
                              method: "POST",
                            });

                            location.reload();
                          }}
                          className="w-full px-4 py-2 text-center transition hover:bg-black hover:text-white"
                        >
                          Logout
                        </button>
                      </NavMenu.Link>
                    </li>
                  </ul>
                </NavMenu.Content>
              </>
            ))
            .with("OAuth", () => (
              <NavMenu.Link
                className="border border-black bg-black px-3 py-2 font-bold text-white transition hover:bg-white hover:text-black   "
                asChild
              >
                <Link href="/register">Register</Link>
              </NavMenu.Link>
            ))
            .otherwise(() => (
              <NavMenu.Link
                className="border border-black bg-black px-3 py-2 font-bold text-white transition hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/signin">Sign In</Link>
              </NavMenu.Link>
            ))}
        </NavMenu.Item>
      </NavMenu.List>
    </NavMenu.Root>
  );
}
