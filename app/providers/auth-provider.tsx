'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const protectedRoutes = ['/dashboard', '/settings', '/profile'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // This will be replaced with actual API call
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && !user && protectedRoutes.some(route => pathname?.startsWith(route))) {
      router.push('/login');
    }
  }, [loading, user, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // This will be replaced with actual API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'admin',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // This will be replaced with actual API call
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'employee',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // This will be replaced with actual API call
      localStorage.removeItem('user');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
