import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Fragment } from 'react';

export default function MobileDropdown() {
  return (
    <Menu as="div" className="flex relative md:hidden">
      <Menu.Button>
        <Bars3Icon className="w-6 h-6 mr-4" />
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
        <Menu.Items className="absolute border flex flex-col bg-white top-10 w-48 p-2">
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-black text-white"} px-4 py-2`}
                href="#about"
              >
                About
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-black text-white"} px-4 py-2`}
                href="#faq"
              >
                FAQ
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-black text-white"} px-4 py-2`}
                href="#schedule"
              >
                Schedule
              </a>
            )}
          </Menu.Item>      <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-black text-white"} px-4 py-2`}
                href="#sponsors"
              >
                Sponsors
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>

  );
}
