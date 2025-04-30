// app/admin/providers/AuthProvider.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactNode,useContext, useEffect, useState } from 'react';

const VALID_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TOKEN_URL;

interface AuthContextType {
  isAuthorized: boolean;
  isLoading: boolean;
  validateToken: (token: string) => void;
  logout: () => void;
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      validateToken(token);
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
   
  }, [searchParams]);

  const validateToken = (token: string) => {
    setIsLoading(true);
    
    // Simulate async validation if needed
    setTimeout(() => {
      if (token === VALID_ACCESS_TOKEN) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    }, 300);
  };

  const logout = () => {
    setIsAuthorized(false);
    router.push('/admin');
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, isLoading, validateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}