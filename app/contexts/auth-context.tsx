'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TFUser, auth } from '@/services/firebase';

type AuthContextType = {
  user: TFUser | null;
  role: 'admin' | 'user' | 'guest';
  handleCreateUser: (email: string, password: string) => Promise<TFUser | any>;
  handleLoginEmail: (email: string, password: string) => Promise<TFUser | any>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<TFUser | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | 'guest'>('guest');

  const handleCreateUser = async (email: string, password: string) => {
    if (!email || !password || loading) return;

    try {
      setLoading(true);

      const result = await auth.createUserWithEmailAndPassword(email, password);
      const { user: u } = result;

      setUser(u as TFUser);

      return {
        user: u as TFUser,
      };
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginEmail = async (email: string, password: string) => {
    try {
      setLoading(true);

      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user: u } = result;

      setUser(u as TFUser);

      return {
        user: u as TFUser,
      };
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        handleCreateUser,
        handleLoginEmail,
        // loginEmail: handleLoginEmail,
        // loginGoogle: handleLoginGoogle,
        // loginGitHub: handleLoginGitHub,
        // logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
