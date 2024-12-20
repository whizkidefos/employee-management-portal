'use client';

import { useState } from 'react';
import { PageHeader } from "@/app/components/page-header";
import { useAuth } from "@/app/lib/contexts/auth-context";
import {
  UserCircleIcon,
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const activities = [
  { id: 1, type: 'timesheet', description: 'Clocked in', date: '2 hours ago' },
  { id: 2, type: 'leave', description: 'Requested vacation', date: 'Yesterday' },
  { id: 3, type: 'task', description: 'Completed patient assessment', date: '2 days ago' },
  { id: 4, type: 'training', description: 'Completed HIPAA training', date: '1 week ago' },
];

const stats = [
  { name: 'Hours this week', value: '38.5', icon: ClockIcon },
  { name: 'Tasks completed', value: '12', icon: BriefcaseIcon },
  { name: 'Leave balance', value: '15 days', icon: CalendarIcon },
];

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    jobRole: user?.jobRole || '',
    address: user?.address || '',
    postcode: user?.postcode || '',
  });

  if (isLoading) {
    return (
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="Profile"
        description="View and manage your profile information"
      />

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Work Info Card */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Work Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobRole" className="block text-sm font-medium mb-2">
                  Job Role
                </label>
                <input
                  type="text"
                  id="jobRole"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium mb-2">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <dl className="grid grid-cols-1 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="flex items-center justify-between p-3 bg-light-border/10 dark:bg-dark-border/10 rounded-lg"
                >
                  <div className="flex items-center">
                    <stat.icon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                    <dt className="text-sm font-medium">{stat.name}</dt>
                  </div>
                  <dd className="text-sm font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {activities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== activities.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-light-border dark:bg-dark-border"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-primary-600/10 dark:bg-primary-400/10 flex items-center justify-center ring-8 ring-light-background dark:ring-dark-background">
                            <UserCircleIcon
                              className="h-5 w-5 text-primary-600 dark:text-primary-400"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4">
                          <div>
                            <p className="text-sm">{activity.description}</p>
                          </div>
                          <div className="whitespace-nowrap text-sm text-light-text/60 dark:text-dark-text/60">
                            {activity.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
