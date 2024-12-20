'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usersApi } from '../api';
import type { UserProfile } from '../api';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  profileCompleteness: number;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  profileCompleteness: 0,
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateProfileCompleteness = (user: UserProfile): number => {
    if (!user) return 0;

    const fields = [
      user.firstName,
      user.lastName,
      user.email,
      user.phoneNumber,
      user.jobRole,
      user.dateOfBirth,
      user.gender,
      user.postcode,
      user.address,
      user.country,
      user.nationalInsuranceNumber,
      user.nationality,
      user.workHistory,
      user.bankDetails?.accountNumber,
      user.bankDetails?.sortCode,
      user.bankDetails?.bankName,
      user.signature,
    ];

    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const userData = await usersApi.getCurrentProfile();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAdmin: user?.isAdmin ?? false,
    profileCompleteness: calculateProfileCompleteness(user!),
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
