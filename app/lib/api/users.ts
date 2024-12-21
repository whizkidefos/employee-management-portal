import { LoginCredentials, RegisterData, UserProfile } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8800/api';

export const usersApi = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  },

  async register(data: RegisterData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  async getCurrentProfile(): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  async updateProfile(data: Partial<UserProfile>) {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  },

  async updateProfileImage(formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/users/me/image`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile image');
    }

    return response.json();
  },

  async getUserSettings() {
    const response = await fetch(`${API_BASE_URL}/users/me/settings`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user settings');
    }

    return response.json();
  },

  async updateUserSettings(settings: any) {
    const response = await fetch(`${API_BASE_URL}/users/me/settings`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error('Failed to update user settings');
    }

    return response.json();
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await fetch(`${API_BASE_URL}/users/me/password`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      throw new Error('Failed to change password');
    }

    return response.json();
  },

  async enable2FA() {
    const response = await fetch(`${API_BASE_URL}/users/me/2fa/enable`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to enable 2FA');
    }

    return response.json();
  },

  async verify2FA(code: string) {
    const response = await fetch(`${API_BASE_URL}/users/me/2fa/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify 2FA');
    }

    return response.json();
  },

  async disable2FA(code: string) {
    const response = await fetch(`${API_BASE_URL}/users/me/2fa/disable`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to disable 2FA');
    }

    return response.json();
  },

  async exportData() {
    const response = await fetch(`${API_BASE_URL}/users/me/export`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export data');
    }

    return response.blob();
  },

  async deactivateAccount(password: string) {
    const response = await fetch(`${API_BASE_URL}/users/me/deactivate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error('Failed to deactivate account');
    }

    return response.json();
  },
};
