'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from './logo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Employees', href: '/employees' },
  { name: 'Departments', href: '/departments' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Settings', href: '/settings' },
];

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const pathname = usePathname();

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
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-light-background dark:bg-dark-background pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 hover:bg-light-card dark:hover:bg-dark-card"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-2">
                <Link href="/" className="flex items-center gap-2 px-4" onClick={() => setIsOpen(false)}>
                  <Logo className="h-8 w-auto" />
                </Link>
              </div>

              <div className="space-y-6 border-t border-light-border dark:border-dark-border px-4 py-6">
                {navigation.map((item) => (
                  <div key={item.name} className="-m-3">
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2 text-base font-medium hover:bg-light-card dark:hover:bg-dark-card ${
                        pathname === item.href
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-light-text/60 dark:text-dark-text/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-light-border dark:border-dark-border px-4 py-6">
                <div className="flow-root">
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-light-text/60 hover:bg-light-card hover:text-light-text dark:text-dark-text/60 dark:hover:bg-dark-card dark:hover:text-dark-text"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    href="/register"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-primary-600 hover:bg-light-card dark:text-primary-400 dark:hover:bg-dark-card"
                    onClick={() => setIsOpen(false)}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
