"use client";

import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import ScrollToButton from "./ScrollToButton";

export default function MobileDropdown() {
  return (
    <Menu as="div" className="relative flex font-medium md:hidden">
      <Menu.Button className="mr-4">
        <Bars3Icon className="h-6 w-6" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-10 flex w-48 flex-col border bg-white p-2">
          <Menu.Item>
            {({ active }) => (
              <ScrollToButton
                elementId="#about"
                className={`${active && "bg-black text-white"} px-4 py-2`}
              >
                About
              </ScrollToButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <ScrollToButton
                elementId="#faq"
                className={`${active && "bg-black text-white"} px-4 py-2`}
              >
                FAQ
              </ScrollToButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <ScrollToButton
                elementId="#guide"
                className={`${active && "bg-black text-white"} px-4 py-2`}
              >
                Guide
              </ScrollToButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <ScrollToButton
                elementId="#sponsors"
                className={`${active && "bg-black text-white"} px-4 py-2`}
              >
                Sponsors
              </ScrollToButton>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
