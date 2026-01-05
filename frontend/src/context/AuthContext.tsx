'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Role, Country } from '@/types/enums';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    userId: number | null;
    role: Role | null;
    country: Country | null;
  };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    userId: number | null;
    role: Role | null;
    country: Country | null;
  }>({
    userId: null,
    role: null,
    country: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<{ userId: number; role: Role; country: Country }>(token);
        setUser({
          userId: decoded.userId,
          role: decoded.role,
          country: decoded.country,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token');
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    const decoded = jwtDecode<{ userId: number; role: Role; country: Country }>(token);
    Cookies.set('token', token, { expires: 7 }); // expires in 7 days
    setUser({
      userId: decoded.userId,
      role: decoded.role,
      country: decoded.country,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser({ userId: null, role: null, country: null });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
