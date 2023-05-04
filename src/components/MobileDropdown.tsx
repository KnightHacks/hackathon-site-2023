import { scrollTo } from '@/utils';
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
              <button
                className={`${active && "bg-black text-white"} px-4 py-2`}
                onClick={() => scrollTo("#about")}>
                About
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && "bg-black text-white"} px-4 py-2`}
                onClick={() => scrollTo("#faq")}>
                FAQ
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && "bg-black text-white"} px-4 py-2`}
                onClick={() => scrollTo("#schedule")}>
                Schedule
              </button>
            )}
          </Menu.Item>      <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && "bg-black text-white"} px-4 py-2`}
                onClick={() => scrollTo("#sponsors")}>
                Sponsors
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>

  );
}