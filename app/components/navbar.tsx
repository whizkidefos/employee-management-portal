'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Logo } from './logo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Employees', href: '/employees' },
  { name: 'Departments', href: '/departments' },
  { name: 'Settings', href: '/settings' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-border dark:border-dark-border bg-light-background/80 dark:bg-dark-background/80 backdrop-blur supports-[backdrop-filter]:bg-light-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex-shrink-0">
            <Logo className="h-8 w-auto" />
            <span className="sr-only">New Horizon Healthcare Services</span>
          </Link>
          <div className="hidden md:flex md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  pathname === item.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-light-text/60 dark:text-dark-text/60'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="btn-secondary">
            Sign in
          </Link>
          <Link href="/register" className="btn-primary">
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
