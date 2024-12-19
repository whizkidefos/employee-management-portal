'use client';

import { useEffect } from 'react';
import { PageHeader } from "../components/page-header";
import { useAuth } from "../providers/auth-provider";
import {
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Employees",
    value: "250",
    icon: UserGroupIcon,
    change: "+12%",
    changeType: "positive",
  },
  {
    name: "Departments",
    value: "12",
    icon: BriefcaseIcon,
    change: "+2",
    changeType: "positive",
  },
  {
    name: "Average Attendance",
    value: "95%",
    icon: ClockIcon,
    change: "+3%",
    changeType: "positive",
  },
  {
    name: "Performance",
    value: "88%",
    icon: ChartBarIcon,
    change: "+5%",
    changeType: "positive",
  },
];

const activities = [
  { id: 1, user: 'John Doe', action: 'clocked in', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'submitted report', time: '4 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'updated profile', time: '5 hours ago' },
  { id: 4, user: 'Sarah Williams', action: 'requested leave', time: '1 day ago' },
];

const events = [
  { id: 1, title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'meeting' },
  { id: 2, title: 'Project Deadline', date: 'Tomorrow, 5:00 PM', type: 'deadline' },
  { id: 3, title: 'Training Session', date: 'Dec 21, 10:00 AM', type: 'training' },
  { id: 4, title: 'Performance Review', date: 'Dec 22, 3:00 PM', type: 'review' },
];

function PerformanceChart() {
  return (
    <div className="relative h-[200px] w-full">
      <div className="absolute bottom-0 left-0 h-32 w-full">
        <div className="flex h-full items-end justify-between gap-2">
          {[65, 75, 80, 85, 88, 92, 95].map((value, i) => (
            <div key={i} className="relative flex-1">
              <div
                className="absolute bottom-0 w-full rounded-t-sm bg-primary-600 dark:bg-primary-400"
                style={{ height: `${value}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t border-light-border dark:border-dark-border" />
    </div>
  );
}

function AttendanceChart() {
  return (
    <div className="relative h-[200px] w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-light-border dark:text-dark-border"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray="251.2"
          strokeDashoffset="12.56"
          className="text-primary-600 dark:text-primary-400"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-2xl font-bold"
        >
          95%
        </text>
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();

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

  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader
          title={`Welcome back, ${user.name}`}
          description="Here's what's happening in your organization"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary-50 dark:bg-primary-500/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-6">Performance Trend</h2>
            <PerformanceChart />
            <div className="mt-4 flex justify-between text-sm text-light-text/60 dark:text-dark-text/60">
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-6">Attendance Rate</h2>
            <AttendanceChart />
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="divide-y divide-light-border dark:divide-dark-border">
              {activities.map((activity) => (
                <div key={activity.id} className="py-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-sm text-light-text/60 dark:text-dark-text/60">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                    {activity.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="divide-y divide-light-border dark:divide-dark-border">
              {events.map((event) => (
                <div key={event.id} className="py-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-light-text/60 dark:text-dark-text/60">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                    {event.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
