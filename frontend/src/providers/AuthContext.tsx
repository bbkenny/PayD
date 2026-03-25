import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'employer' | 'employee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  publicAddress?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'payd_auth_token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodeToken = (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub || payload.id,
        email: payload.email,
        role: payload.role as UserRole,
        publicAddress: payload.publicAddress,
      };
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      const decodedUser = decodeToken(savedToken);
      if (decodedUser) {
        setToken(savedToken);
        setUser(decodedUser);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    const decodedUser = decodeToken(newToken);
    if (decodedUser) {
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(decodedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
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
