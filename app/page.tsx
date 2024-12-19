'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { name: 'Active Employees', value: '500+', icon: UserGroupIcon },
  { name: 'Departments', value: '12', icon: BuildingOfficeIcon },
  { name: 'Task Completion Rate', value: '94%', icon: CheckCircleIcon },
  { name: 'Average Performance', value: '4.8/5', icon: ArrowTrendingUpIcon },
];

const features = [
  {
    name: 'Employee Management',
    description: 'Easily manage your workforce with comprehensive employee profiles and performance tracking.',
    icon: UserGroupIcon,
  },
  {
    name: 'Department Organization',
    description: 'Organize your teams efficiently with our department management system.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Performance Analytics',
    description: 'Track and analyze employee performance with detailed analytics and reports.',
    icon: ChartBarIcon,
  },
  {
    name: 'Time Tracking',
    description: 'Monitor attendance and working hours with our advanced time tracking system.',
    icon: ClockIcon,
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-primary-950/50 dark:to-dark-background py-20">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,black,transparent)]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Employee Management Made Simple
              </h1>
              <p className="mt-6 text-lg leading-8 text-light-text/80 dark:text-dark-text/80">
                Streamline your workforce management with our modern, intuitive platform.
                From onboarding to performance tracking, we've got you covered.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href="/register" className="btn-primary">
                  Get started
                </Link>
                <Link href="/about" className="link">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square w-full max-w-lg rounded-2xl bg-gradient-to-br from-primary-500/20 to-transparent p-8">
                <svg
                  viewBox="0 0 400 400"
                  className="absolute inset-0 h-full w-full stroke-primary-600/20 dark:stroke-primary-400/20"
                  strokeWidth="2"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 rounded-xl border border-primary-600/20 dark:border-primary-400/20" />
                  <div className="absolute inset-0 bg-primary-600/5 dark:bg-primary-400/5 backdrop-blur-3xl rounded-xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="card flex flex-col items-center text-center p-6"
              >
                <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <div className="mt-4">
                  <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
                  <div className="mt-1 text-sm text-light-text/60 dark:text-dark-text/60">{stat.name}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light-card dark:bg-dark-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to manage your workforce
            </h2>
            <p className="mt-4 text-lg text-light-text/80 dark:text-dark-text/80">
              Our comprehensive suite of tools helps you streamline operations and boost productivity.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="card group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative p-6">
                  <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  <h3 className="mt-4 text-lg font-semibold">{feature.name}</h3>
                  <p className="mt-2 text-light-text/80 dark:text-dark-text/80">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-primary-600 dark:bg-primary-500"
          >
            <div className="absolute inset-0">
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 800 400"
              >
                <circle cx="400" cy="200" r="250" className="fill-white/10" />
                <circle cx="400" cy="200" r="200" className="fill-white/5" />
                <circle cx="400" cy="200" r="150" className="fill-white/5" />
                <circle cx="400" cy="200" r="100" className="fill-white/5" />
                <circle cx="400" cy="200" r="50" className="fill-white/5" />
              </svg>
            </div>
            <div className="relative px-6 py-16 sm:px-16 sm:py-24 lg:px-24">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your workforce management?
              </h2>
              <p className="mt-6 text-lg text-white/80">
                Join thousands of healthcare organizations that trust New Horizon for their employee management needs.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/register" className="btn-white">
                  Get started
                </Link>
                <Link href="/contact" className="btn-white-outline">
                  Contact sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
