"use client";
import { GearIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import * as NavMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { match } from "ts-pattern";
import { UserState, scrollToElementById } from "../utils";
import { BlackDragonLogo } from "./Logos";
import Image from "next/image";

export default function Navbar({ userState }: { userState: UserState }) {
  return (
    <NavMenu.Root>
      <NavMenu.List className="fixed top-0 flex h-16 w-full items-center justify-between bg-white px-6 font-serif text-lg shadow">
        <Image
          src="/mlh.png"
          width={60}
          height={60}
          alt="MLH 2024 banner"
          className="absolute top-16 "
        />
        <div className="flex items-center">
          <NavMenu.Item className="relative md:hidden">
            <NavMenu.Trigger className="mr-3 flex items-center justify-between p-1.5 transition hover:bg-gray-100">
              <HamburgerMenuIcon className="h-6 w-6" />
            </NavMenu.Trigger>
            <NavMenu.Content className="absolute top-10 w-[200px] border bg-white p-2">
              <ul>
                <li>
                  <NavMenu.Link asChild>
                    <button
                      className="w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
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
                      className="w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
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
                      className="w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
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
                      className="w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
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
                  className="uppercase"
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
                  className="uppercase"
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
                  className="uppercase"
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
                  className="uppercase"
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
                <NavMenu.Trigger className="flex items-center p-1.5 transition hover:bg-gray-100">
                  <GearIcon className="h-6 w-6" />
                </NavMenu.Trigger>
                <NavMenu.Content className="absolute right-0 top-10 w-[200px] border bg-white p-2">
                  <ul>
                    <li>
                      <NavMenu.Link
                        className="block w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
                        asChild
                      >
                        <Link href="/apply">Apply</Link>
                      </NavMenu.Link>
                    </li>
                    <li>
                      <NavMenu.Link
                        className="block w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
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
                          className="w-full px-4 py-2 text-center uppercase transition hover:bg-black hover:text-white"
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
