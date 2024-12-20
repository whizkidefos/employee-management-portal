'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './theme-toggle';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';
import { NavLink } from './nav-link';
import { mainNavigation } from '../config/navigation';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-light-border dark:border-dark-border bg-light-background/80 dark:bg-dark-background/80 backdrop-blur supports-[backdrop-filter]:bg-light-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
              <span className="sr-only">New Horizon Healthcare Services</span>
            </Link>
            <div className="hidden lg:flex lg:gap-x-8">
              {mainNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              className="-m-2.5 p-2.5 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <NavLink href="/login" className="text-sm font-medium">
                Sign in
              </NavLink>
              <Link
                href="/register"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
}
