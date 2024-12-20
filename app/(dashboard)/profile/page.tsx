'use client';

import { useState } from 'react';
import { PageHeader } from "../components/page-header";
import { useAuth } from "../providers/auth-provider";
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
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@newhorizon.com',
    phone: '+1 (555) 123-4567',
    department: 'Executive Management',
    location: 'San Francisco, CA',
    bio: 'Chief Medical Officer with over 15 years of experience in healthcare management.',
  });

  if (loading) {
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

  if (!user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader title="Profile" description="Manage your profile and preferences" />
        
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-1">
            {/* Profile Card */}
            <div className="card text-center">
              <div className="relative mx-auto mb-4 h-32 w-32">
                <UserCircleIcon className="h-full w-full text-light-text/20 dark:text-dark-text/20" />
                <button className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-2 text-white hover:bg-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl font-semibold">{`${formData.firstName} ${formData.lastName}`}</h2>
              <p className="text-light-text/60 dark:text-dark-text/60">{formData.department}</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-light-text/60 dark:text-dark-text/60">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-light-text/60 dark:text-dark-text/60">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-light-text/60 dark:text-dark-text/60">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>{formData.email}</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="card">
              <h3 className="mb-4 font-semibold">Statistics</h3>
              <dl className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-4">
                    <dt className="flex items-center gap-2">
                      <stat.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      <span className="text-sm text-light-text/60 dark:text-dark-text/60">{stat.name}</span>
                    </dt>
                    <dd className="ml-auto font-medium">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Recent Activity Card */}
            <div className="card">
              <h3 className="mb-4 font-semibold">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="relative mt-1">
                      <div className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                      </div>
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-light-border dark:bg-dark-border" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-light-text/60 dark:text-dark-text/60">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 md:col-span-2">
            {/* Personal Information Form */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
