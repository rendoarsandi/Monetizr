'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient, User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: 'creator' | 'promoter';
  }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!apiClient.isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.verifyToken();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        apiClient.logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      apiClient.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.login(email, password);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return true;
      } else {
        setError(response.error || 'Login failed');
        return false;
      }
    } catch (error) {
      setError('Network error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role?: 'creator' | 'promoter';
  }): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.register(data);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return true;
      } else {
        setError(response.error || 'Registration failed');
        return false;
      }
    } catch (error) {
      setError('Network error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
