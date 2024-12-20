'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from './logo';
import { NavLink } from './nav-link';
import { mainNavigation } from '../config/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 -mr-16 flex pt-4 pr-2">
                  <button
                    type="button"
                    className="relative -m-2.5 p-2.5 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-light-background dark:bg-dark-background px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo className="h-8 w-auto" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {mainNavigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              href={item.href}
                              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                              activeClassName="bg-light-border dark:bg-dark-border text-primary-600 dark:text-primary-400"
                              inactiveClassName="text-light-text/60 dark:text-dark-text/60 hover:text-light-text hover:bg-light-border dark:hover:text-dark-text dark:hover:bg-dark-border"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <div className="flex flex-col gap-4">
                        <NavLink
                          href="/login"
                          className="text-sm font-medium text-center"
                        >
                          Sign in
                        </NavLink>
                        <Link
                          href="/register"
                          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 text-center"
                        >
                          Register
                        </Link>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
