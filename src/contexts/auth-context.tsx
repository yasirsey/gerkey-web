"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, AuthResponse, RegisterData, LoginData, ApiError } from '@/lib/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Token'ları localStorage'dan al
  const getStoredTokens = () => {
    if (typeof window === 'undefined') return null;
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  };

  // Token'ları localStorage'a kaydet
  const storeTokens = (authResponse: AuthResponse) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', authResponse.accessToken);
    localStorage.setItem('refreshToken', authResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  };

  // Token'ları temizle
  const clearTokens = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const clearError = () => setError(null);

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.login(data);
      
      storeTokens(response);
      setUser(response.user);
      
      router.push('/');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Giriş yapılırken bir hata oluştu');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.register(data);
      
      storeTokens(response);
      setUser(response.user);
      
      router.push('/');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Kayıt olurken bir hata oluştu');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const tokens = getStoredTokens();
      if (tokens) {
        await apiService.logout(tokens.accessToken);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearTokens();
      setUser(null);
      router.push('/auth/login');
    }
  };

  // Sayfa yüklendiğinde kullanıcı durumunu kontrol et
  useEffect(() => {
    const initAuth = async () => {
      try {
        const tokens = getStoredTokens();
        if (!tokens) {
          setIsLoading(false);
          return;
        }

        // Kullanıcı bilgilerini localStorage'dan al
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Token'ın geçerliliğini kontrol et
        try {
          await apiService.getProfile(tokens.accessToken);
        } catch {
          // Token geçersizse refresh token ile yenile
          try {
            const response = await apiService.refreshToken(tokens.refreshToken);
            storeTokens(response);
            setUser(response.user);
          } catch {
            // Refresh token da geçersizse çıkış yap
            clearTokens();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 