import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';
import { AuthContextType } from '../types/AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const setAuthState = (authState: {
    isAuthenticated: boolean;
    user: User | null;
  }) => {
    setIsAuthenticated(authState.isAuthenticated);
    setUser(authState.user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
