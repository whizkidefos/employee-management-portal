'use client';

import { useState } from 'react';
import { PageHeader } from "../components/page-header";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

function MapPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full stroke-light-border/10 dark:stroke-dark-border/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="map-pattern"
          width={40}
          height={40}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 40V.5H40" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#map-pattern)" />
      <svg x="50%" y={-1} className="overflow-visible fill-light-card/20 dark:fill-dark-card/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="flex-1">
      <div className="relative isolate">
        <MapPattern />
        <div className="container py-12 sm:py-16 lg:py-20">
          <PageHeader
            title="Contact Us"
            description="Have questions? We're here to help. Send us a message and we'll respond as soon as possible."
          />

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-bold">Get in touch</h2>
                <p className="mt-4 text-base text-light-text/60 dark:text-dark-text/60">
                  Our friendly team would love to hear from you. Whether you have a question about our services, 
                  need a demo, or anything else, we're ready to answer all your questions.
                </p>
              </div>

              <div className="rounded-2xl bg-light-card dark:bg-dark-card p-8 ring-1 ring-light-border/10 dark:ring-dark-border/10">
                <h3 className="text-lg font-semibold mb-6">Our Contact Information</h3>
                <dl className="space-y-6">
                  <div className="flex gap-x-4">
                    <dt>
                      <EnvelopeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <p className="text-sm font-medium">Email</p>
                      <p className="mt-1 text-light-text/60 dark:text-dark-text/60">support@newhorizonhealthcare.com</p>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt>
                      <PhoneIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="mt-1 text-light-text/60 dark:text-dark-text/60">+1 (555) 123-4567</p>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt>
                      <MapPinIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <p className="text-sm font-medium">Office</p>
                      <p className="mt-1 text-light-text/60 dark:text-dark-text/60">
                        123 Healthcare Ave<br />
                        Medical District<br />
                        San Francisco, CA 90210
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="rounded-2xl bg-light-card dark:bg-dark-card p-8 ring-1 ring-light-border/10 dark:ring-dark-border/10">
                <h2 className="text-lg font-semibold mb-6">Send us a message</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full"
                      placeholder="Your name"
                      required
                    />
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
                      className="w-full"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
