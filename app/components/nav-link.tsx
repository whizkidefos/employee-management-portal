'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function NavLink({
  href,
  children,
  className = '',
  activeClassName = 'text-primary-600 dark:text-primary-400',
  inactiveClassName = 'text-light-text/60 dark:text-dark-text/60',
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        className,
        'transition-colors hover:text-primary-600 dark:hover:text-primary-400',
        isActive ? activeClassName : inactiveClassName
      )}
    >
      {children}
    </Link>
  );
}
