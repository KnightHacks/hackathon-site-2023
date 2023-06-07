"use client";
import { GearIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import * as NavMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { match } from "ts-pattern";
import { UserState, scrollToElementById } from "../../utils";
import { BlackDragonLogo } from "../assets/Logos";

export default function Navbar({ userState }: { userState: UserState }) {
  return (
    <NavMenu.Root>
      <NavMenu.List className="fixed top-0 flex h-16 w-full items-center justify-between bg-white px-6 font-serif shadow">
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
                      className="w-full px-4 py-2 text-center hover:bg-black hover:text-white"
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
                      className="w-full px-4 py-2 text-center hover:bg-black hover:text-white"
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
                      className="w-full px-4 py-2 text-center hover:bg-black hover:text-white"
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
                      className="w-full px-4 py-2 text-center hover:bg-black hover:text-white"
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
                <NavMenu.Trigger className="flex items-center fill-black">
                  <GearIcon className="h-6 w-6 fill-black" />
                </NavMenu.Trigger>
                <NavMenu.Content className="absolute right-0 top-10 w-[200px] border bg-white p-2">
                  <ul>
                    <li>
                      <NavMenu.Link
                        className="block w-full px-4 py-2 text-center hover:bg-black hover:text-white"
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
                          className="w-full px-4 py-2 text-center hover:bg-black hover:text-white"
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
                className="border border-black bg-black px-3 py-2 font-bold text-white"
                asChild
              >
                <Link href="/register">Register</Link>
              </NavMenu.Link>
            ))
            .otherwise(() => (
              <NavMenu.Link
                className="border border-black bg-black px-3 py-2 font-bold text-white"
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
