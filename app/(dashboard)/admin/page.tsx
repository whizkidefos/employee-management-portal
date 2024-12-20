'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import {
  UsersIcon,
  CalendarIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { adminApi } from '@/app/lib/api';

export default function AdminDashboard() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeShifts: 0,
    pendingDocuments: 0,
    ongoingTrainings: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/dashboard');
      return;
    }

    if (!isLoading && isAdmin) {
      loadStats();
    }
  }, [isAdmin, isLoading, router]);

  const loadStats = async () => {
    try {
      const data = await adminApi.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  const adminSections = [
    {
      name: 'Employee Management',
      href: '/admin/employees',
      icon: UsersIcon,
      stat: stats.totalEmployees,
      label: 'Total Employees',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      name: 'Shift Management',
      href: '/admin/shifts',
      icon: CalendarIcon,
      stat: stats.activeShifts,
      label: 'Active Shifts',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: 'Training Management',
      href: '/admin/training',
      icon: AcademicCapIcon,
      stat: stats.ongoingTrainings,
      label: 'Ongoing Trainings',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      name: 'Document Verification',
      href: '/admin/documents',
      icon: DocumentTextIcon,
      stat: stats.pendingDocuments,
      label: 'Pending Documents',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      name: 'Payment Management',
      href: '/admin/payments',
      icon: BanknotesIcon,
      stat: stats.pendingPayments,
      label: 'Pending Payments',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: ChartBarIcon,
      stat: null,
      label: 'View Reports',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
          Manage your organization's workforce and operations
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => (
          <a
            key={section.name}
            href={section.href}
            className="card hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${section.bgColor}`}>
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <h3 className="font-medium">{section.name}</h3>
                </div>
                {section.stat !== null && (
                  <span className="text-2xl font-semibold">{section.stat}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-light-text/60 dark:text-dark-text/60">
                {section.label}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
