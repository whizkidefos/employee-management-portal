'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/app/lib/utils';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { NavLink } from '@/app/components/nav-link';
import { userNavigation, adminNavigation } from '@/app/config/navigation';
import { Logo } from '@/app/components/logo';
import type { NavigationItem } from '@/app/config/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isAdmin } = useAuth();
  
  const navigation = isAdmin ? adminNavigation : userNavigation;

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
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
                      className="relative -m-2.5 p-2.5 text-light-text dark:text-dark-text"
                      onClick={() => setSidebarOpen(false)}
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
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <NavLink
                                href={item.href}
                                className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                                activeClassName="bg-light-border dark:bg-dark-border text-primary-600 dark:text-primary-400"
                                inactiveClassName="text-light-text/60 dark:text-dark-text/60 hover:text-light-text hover:bg-light-border dark:hover:text-dark-text dark:hover:bg-dark-border"
                              >
                                <item.icon
                                  className={cn(
                                    'h-6 w-6 shrink-0',
                                    'text-light-text/60 dark:text-dark-text/60 group-hover:text-light-text dark:group-hover:text-dark-text'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div 
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
          isCollapsed ? "lg:w-20" : "lg:w-72",
          "transition-all duration-300 ease-in-out"
        )}
        onMouseEnter={() => isAdmin && setIsCollapsed(false)}
        onMouseLeave={() => isAdmin && setIsCollapsed(true)}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            {isCollapsed ? (
              <Logo className="h-8 w-8" />
            ) : (
              <Logo className="h-8 w-auto" />
            )}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold",
                          isCollapsed && "justify-center"
                        )}
                        activeClassName="bg-light-border dark:bg-dark-border text-primary-600 dark:text-primary-400"
                        inactiveClassName="text-light-text/60 dark:text-dark-text/60 hover:text-light-text hover:bg-light-border dark:hover:text-dark-text dark:hover:bg-dark-border"
                      >
                        <item.icon
                          className={cn(
                            'h-6 w-6 shrink-0',
                            'text-light-text/60 dark:text-dark-text/60 group-hover:text-light-text dark:group-hover:text-dark-text',
                            isCollapsed && "mr-0"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "transition-all duration-300",
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                          )}
                        >
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:pl-20" : "lg:pl-72"
      )}>
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-light-border dark:bg-dark-border lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
