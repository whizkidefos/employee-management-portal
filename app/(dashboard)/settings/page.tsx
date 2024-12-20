'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { PageHeader } from '@/app/components/page-header';
import { 
  XCircleIcon,
  CheckCircleIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

interface SettingsFormData {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<SettingsFormData>({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    theme: 'system',
    language: 'en',
  });

  useEffect(() => {
    // Load user settings when component mounts
    const loadSettings = async () => {
      try {
        // TODO: Implement settings API
        // const settings = await api.getUserSettings();
        // setFormData(settings);
      } catch (err) {
        setError('Failed to load settings');
      }
    };

    if (!isLoading && user) {
      loadSettings();
    }
  }, [isLoading, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement settings API
      // await api.updateUserSettings(formData);
      setSuccess('Settings updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">{success}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCircleIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Profile</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input mt-1"
                  value={user?.name || ''}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input mt-1"
                  value={user?.email || ''}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BellIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notifications" className="text-sm font-medium">
                  Email Notifications
                </label>
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="toggle"
                  checked={formData.notifications.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        email: e.target.checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="push-notifications" className="text-sm font-medium">
                  Push Notifications
                </label>
                <input
                  type="checkbox"
                  id="push-notifications"
                  className="toggle"
                  checked={formData.notifications.push}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        push: e.target.checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sms-notifications" className="text-sm font-medium">
                  SMS Notifications
                </label>
                <input
                  type="checkbox"
                  id="sms-notifications"
                  className="toggle"
                  checked={formData.notifications.sms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        sms: e.target.checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <PaintBrushIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Appearance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium">
                  Theme
                </label>
                <select
                  id="theme"
                  className="input mt-1"
                  value={formData.theme}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      theme: e.target.value as 'light' | 'dark' | 'system',
                    })
                  }
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium">
                  Language
                </label>
                <select
                  id="language"
                  className="input mt-1"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      language: e.target.value,
                    })
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Security</h3>
            </div>
            <div className="space-y-4">
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => {
                  // TODO: Implement password change
                }}
              >
                Change Password
              </button>
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => {
                  // TODO: Implement 2FA
                }}
              >
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
