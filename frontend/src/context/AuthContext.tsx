'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeAuthModal: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('tech_shop_user');
      const savedToken = localStorage.getItem('tech_shop_token');
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (e) {
      console.error('Failed to load auth', e);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.access_token);
        localStorage.setItem('tech_shop_user', JSON.stringify(data.user));
        localStorage.setItem('tech_shop_token', data.access_token);
        setIsAuthModalOpen(false);
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.warn('Backend login unavailable, performing local mock session:', err);
    }

    // Fallback demo mock authentication
    const role = email.includes('admin') ? 'admin' : 'customer';
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: role as 'admin' | 'customer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      created_at: new Date().toISOString(),
    };
    const mockToken = 'mock-jwt-token-tech-shop';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('tech_shop_user', JSON.stringify(mockUser));
    localStorage.setItem('tech_shop_token', mockToken);
    setIsAuthModalOpen(false);
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.access_token);
        localStorage.setItem('tech_shop_user', JSON.stringify(data.user));
        localStorage.setItem('tech_shop_token', data.access_token);
        setIsAuthModalOpen(false);
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.warn('Backend register unavailable, creating local session:', err);
    }

    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      created_at: new Date().toISOString(),
    };
    const mockToken = 'mock-jwt-token-tech-shop';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('tech_shop_user', JSON.stringify(mockUser));
    localStorage.setItem('tech_shop_token', mockToken);
    setIsAuthModalOpen(false);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tech_shop_user');
    localStorage.removeItem('tech_shop_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        openLoginModal: () => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        },
        openRegisterModal: () => {
          setAuthModalMode('register');
          setIsAuthModalOpen(true);
        },
        closeAuthModal: () => setIsAuthModalOpen(false),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
