'use client';

import { useAuth } from '@/app/lib/contexts/auth-context';
import Link from 'next/link';
import {
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function UserDashboard() {
  const { user, profileCompleteness } = useAuth();

  const dashboardItems = [
    {
      name: 'Complete Profile',
      href: '/profile/complete',
      icon: ClipboardDocumentCheckIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      name: 'My Shifts',
      href: '/shifts',
      icon: CalendarIcon,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: 'Training',
      href: '/training',
      icon: AcademicCapIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: DocumentTextIcon,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      name: 'Payments',
      href: '/payments',
      icon: BanknotesIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, {user?.firstName}!</h1>
        <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
          Here's an overview of your account
        </p>
      </div>

      {/* Profile Completeness */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5 text-primary-600" />
            <h2 className="font-medium">Profile Completeness</h2>
          </div>
          <span className="text-sm font-medium">{profileCompleteness}%</span>
        </div>
        <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${profileCompleteness}%` }}
          ></div>
        </div>
        {profileCompleteness < 100 && (
          <Link
            href="/profile/complete"
            className="mt-4 inline-block text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Complete your profile to unlock all features
          </Link>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="card hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="font-medium">{item.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
