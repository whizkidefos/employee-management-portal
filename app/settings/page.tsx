'use client';

import { useState } from 'react';
import { PageHeader } from "../components/page-header";
import { useAuth } from "../providers/auth-provider";
import { BellIcon, ShieldCheckIcon, GlobeAltIcon, UserIcon, KeyIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const settings = [
  {
    title: "Account Settings",
    description: "Manage your account preferences and security settings",
    icon: UserIcon,
    items: [
      { 
        name: "Profile Information", 
        description: "Update your personal information and profile settings",
        type: "form",
        fields: [
          { name: "name", label: "Full Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phone", label: "Phone Number", type: "tel" },
          { name: "department", label: "Department", type: "text" },
        ]
      },
      { 
        name: "Password", 
        description: "Change your password or enable two-factor authentication",
        icon: KeyIcon,
        type: "form",
        fields: [
          { name: "currentPassword", label: "Current Password", type: "password" },
          { name: "newPassword", label: "New Password", type: "password" },
          { name: "confirmPassword", label: "Confirm New Password", type: "password" },
        ]
      },
    ],
  },
  {
    title: "Notifications",
    description: "Configure how you receive notifications",
    icon: BellIcon,
    items: [
      { name: "Email Notifications", description: "Receive notifications via email", enabled: true },
      { name: "Desktop Notifications", description: "Show desktop push notifications", enabled: false },
      { name: "SMS Notifications", description: "Receive notifications via SMS", enabled: false },
    ],
  },
  {
    title: "Security",
    description: "Manage your security preferences",
    icon: ShieldCheckIcon,
    items: [
      { name: "Two-Factor Authentication", description: "Add an extra layer of security", enabled: false },
      { name: "Login History", description: "View your recent login activity", type: "link" },
      { name: "Device Management", description: "Manage your connected devices", type: "link" },
    ],
  },
  {
    title: "System Preferences",
    description: "Customize your workspace settings",
    icon: GlobeAltIcon,
    items: [
      { 
        name: "Regional Settings", 
        description: "Configure your language and timezone preferences",
        type: "select",
        options: [
          { name: "language", label: "Language", value: "English (US)", choices: ["English (US)", "Spanish", "French"] },
          { name: "timezone", label: "Time Zone", value: "Pacific Time (PT)", choices: ["Pacific Time (PT)", "Eastern Time (ET)", "UTC"] },
          { name: "dateFormat", label: "Date Format", value: "MM/DD/YYYY", choices: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"] },
        ]
      },
    ],
  },
];

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("Account Settings");
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px,1fr]">
          <nav className="space-y-1">
            {settings.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === section.title
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400'
                    : 'text-light-text hover:bg-light-card dark:text-dark-text dark:hover:bg-dark-card'
                }`}
              >
                <section.icon className="h-5 w-5 flex-shrink-0" />
                {section.title}
              </button>
            ))}
          </nav>

          <div className="space-y-8">
            {settings
              .filter((section) => section.title === activeSection)
              .map((section) => (
                <div key={section.title} className="card">
                  <div className="flex items-center gap-3 mb-6">
                    <section.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    <div>
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <p className="text-light-text/60 dark:text-dark-text/60">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="border-b border-light-border dark:border-dark-border last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {"description" in item && (
                              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {"enabled" in item && (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={item.enabled}
                              />
                              <div className="w-11 h-6 bg-light-border dark:bg-dark-border rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          )}
                          {"type" in item && item.type === "link" && (
                            <button className="btn-secondary">
                              View
                            </button>
                          )}
                        </div>

                        {"type" in item && item.type === "form" && (
                          <form onSubmit={handleSubmit} className="space-y-4">
                            {item.fields.map((field) => (
                              <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                                  {field.label}
                                </label>
                                <input
                                  type={field.type}
                                  id={field.name}
                                  name={field.name}
                                  value={formData[field.name as keyof typeof formData] || ''}
                                  onChange={handleInputChange}
                                  className="block w-full rounded-md border border-light-border dark:border-dark-border px-3 py-2"
                                />
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <button type="submit" className="btn-primary">
                                Save Changes
                              </button>
                            </div>
                          </form>
                        )}

                        {"type" in item && item.type === "select" && (
                          <div className="space-y-4">
                            {item.options.map((option) => (
                              <div key={option.name}>
                                <label htmlFor={option.name} className="block text-sm font-medium mb-1">
                                  {option.label}
                                </label>
                                <select
                                  id={option.name}
                                  name={option.name}
                                  value={option.value}
                                  onChange={handleInputChange}
                                  className="block w-full rounded-md border border-light-border dark:border-dark-border px-3 py-2"
                                >
                                  {option.choices.map((choice) => (
                                    <option key={choice} value={choice}>
                                      {choice}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <button type="button" className="btn-primary">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
