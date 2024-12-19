'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative rounded-lg p-2 hover:bg-light-card dark:hover:bg-dark-card transition-colors"
      aria-label="Toggle theme"
    >
      <span className="relative w-5 h-5 block">
        <SunIcon className="absolute inset-0 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute inset-0 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </span>
    </button>
  );
}
