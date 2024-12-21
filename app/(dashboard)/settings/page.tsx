'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { PageHeader } from '@/app/components/page-header';
import { usersApi } from '@/app/lib/api';
import { 
  XCircleIcon,
  CheckCircleIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  KeyIcon,
  CloudArrowDownIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface SettingsFormData {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    documents: boolean;
    payments: boolean;
    shifts: boolean;
    training: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    density: 'comfortable' | 'compact';
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts';
    emailVisibility: boolean;
    phoneVisibility: boolean;
  };
}

export default function SettingsPage() {
  const { user, isLoading, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<SettingsFormData>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      documents: true,
      payments: true,
      shifts: true,
      training: true,
    },
    appearance: {
      theme: 'system',
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      density: 'comfortable',
    },
    privacy: {
      profileVisibility: 'public',
      emailVisibility: true,
      phoneVisibility: false,
    },
  });

  useEffect(() => {
    // Load user settings when component mounts
    const loadSettings = async () => {
      try {
        const settings = await usersApi.getUserSettings();
        setFormData(settings);
        if (user?.profileImage) {
          setImagePreview(user.profileImage);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };

    if (!isLoading && user) {
      loadSettings();
    }
  }, [isLoading, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload profile image if changed
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        await usersApi.updateProfileImage(formData);
      }

      // Update user settings
      await usersApi.updateUserSettings(formData);
      
      await refreshUser();
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Profile Section */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCircleIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Profile</h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircleIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-50"
                  >
                    <PaintBrushIcon className="w-4 h-4 text-gray-600" />
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
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

          {/* Notifications Section */}
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
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Notification Types</h4>
                <div className="space-y-3">
                  {Object.entries({
                    documents: 'Document Updates',
                    payments: 'Payment Updates',
                    shifts: 'Shift Updates',
                    training: 'Training Updates',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <label htmlFor={`notify-${key}`} className="text-sm">
                        {label}
                      </label>
                      <input
                        type="checkbox"
                        id={`notify-${key}`}
                        className="toggle"
                        checked={formData.notifications[key as keyof typeof formData.notifications]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: {
                              ...formData.notifications,
                              [key]: e.target.checked,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
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
                  value={formData.appearance.theme}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appearance: {
                        ...formData.appearance,
                        theme: e.target.value as 'light' | 'dark' | 'system',
                      },
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
                  value={formData.appearance.language}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appearance: {
                        ...formData.appearance,
                        language: e.target.value,
                      },
                    })
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label htmlFor="density" className="block text-sm font-medium">
                  Display Density
                </label>
                <select
                  id="density"
                  className="input mt-1"
                  value={formData.appearance.density}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appearance: {
                        ...formData.appearance,
                        density: e.target.value as 'comfortable' | 'compact',
                      },
                    })
                  }
                >
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Security</h3>
            </div>
            <div className="space-y-4">
              <button
                type="button"
                className="btn-secondary w-full flex items-center justify-center gap-2"
                onClick={() => {
                  // TODO: Implement password change
                }}
              >
                <KeyIcon className="h-4 w-4" />
                Change Password
              </button>
              <button
                type="button"
                className="btn-secondary w-full flex items-center justify-center gap-2"
                onClick={() => {
                  // TODO: Implement 2FA
                }}
              >
                <ShieldCheckIcon className="h-4 w-4" />
                Enable Two-Factor Authentication
              </button>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Privacy Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="profile-visibility" className="block text-sm font-medium">
                      Profile Visibility
                    </label>
                    <select
                      id="profile-visibility"
                      className="input mt-1"
                      value={formData.privacy.profileVisibility}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: {
                            ...formData.privacy,
                            profileVisibility: e.target.value as 'public' | 'private' | 'contacts',
                          },
                        })
                      }
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="email-visibility" className="text-sm">
                      Show Email Address
                    </label>
                    <input
                      type="checkbox"
                      id="email-visibility"
                      className="toggle"
                      checked={formData.privacy.emailVisibility}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: {
                            ...formData.privacy,
                            emailVisibility: e.target.checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="phone-visibility" className="text-sm">
                      Show Phone Number
                    </label>
                    <input
                      type="checkbox"
                      id="phone-visibility"
                      className="toggle"
                      checked={formData.privacy.phoneVisibility}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: {
                            ...formData.privacy,
                            phoneVisibility: e.target.checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCircleIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium">Account</h3>
            </div>
            <div className="space-y-4">
              <button
                type="button"
                className="btn-secondary w-full flex items-center justify-center gap-2"
                onClick={() => {
                  // TODO: Implement data export
                }}
              >
                <CloudArrowDownIcon className="h-4 w-4" />
                Export Account Data
              </button>
              <button
                type="button"
                className="btn-danger w-full flex items-center justify-center gap-2"
                onClick={() => {
                  // TODO: Implement account deactivation
                }}
              >
                <TrashIcon className="h-4 w-4" />
                Deactivate Account
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
