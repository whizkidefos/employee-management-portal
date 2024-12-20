'use client';

import { ReactNode } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
}

export function StatsCard({ title, value, icon, change, changeLabel }: StatsCardProps) {
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-light-text/60 dark:text-dark-text/60">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
        <div className="rounded-full p-3 bg-primary-50 dark:bg-primary-900/10">
          {icon}
        </div>
      </div>
      {typeof change !== 'undefined' && (
        <div className="mt-4 flex items-center gap-2">
          {change > 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : change < 0 ? (
            <ArrowDownIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
          ) : null}
          <span className={`text-sm font-medium ${getChangeColor(change)}`}>
            {Math.abs(change)}%
          </span>
          {changeLabel && (
            <span className="text-sm text-light-text/60 dark:text-dark-text/60">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
