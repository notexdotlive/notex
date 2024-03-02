'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TFUser, auth } from '@/services/firebase';

import { toast } from '@/infra/sonner';

type AuthContextType = {
  user: TFUser | null;
  handleCreateUser: (email: string, password: string) => Promise<TFUser | any>;
  handleLoginEmail: (email: string, password: string) => Promise<TFUser | any>;
  handleLogout: () => Promise<void | any>;
  handleResetError: () => void;
  handleValidateResponse: (res: any) => {
    message: string;
    slug: string | null;
    type: 'error' | 'warning' | 'info' | 'success' | 'default';
  };
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<TFUser | null>(null);

  const handleCreateUser = async (email: string, password: string) => {
    if (!email || !password || loading) return;

    try {
      setLoading(true);

      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const { user: u } = result;

          setUser(u as TFUser);
          toast.success('User created successfully. Welcome!');

          return u as TFUser;
        });
    } catch (error: any) {
      return handleValidateResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginEmail = async (email: string, password: string) => {
    try {
      setLoading(true);

      await auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          const { user: u } = result;

          setUser(u as TFUser);
          toast.success(`Welcome back, ${u?.displayName}!`);

          return u as TFUser;
        })
        .catch((error) => {
          return handleValidateResponse(error);
        });
    } catch (error: any) {
      return handleValidateResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();

      setUser(null);
      toast.success('See you later!');
    } catch (error: any) {
      return handleValidateResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateResponse = (error: any) => {
    let message: string | null = null;
    let type: 'error' | 'warning' | 'info' | 'success' | 'default' = 'default';

    if (error) {
      const regex = {
        firebase: /Firebase:/,
        code: /\([^()]*\)./g,
        full: /Firebase:|\([^()]*\)./g,
      };

      const slug = error.code.replace(regex.code, '').trim();

      if (error.message) {
        message = error.message.replace(regex.full, '').trim();

        if (message !== null) {
          const first = message.indexOf('.');

          if (first !== -1) message = message.substring(0, first + 1);
          if (message && slug)
            return {
              message,
              slug,
              type: 'error',
            };
        }

        setError(message);
      }
    }

    if (message === null || message === '')
      message = 'An error occurred. Please try again.';

    return {
      message,
      slug: null,
      type,
    };
  };

  const handleResetError = () => setError(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u as TFUser);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleCreateUser,
        handleLoginEmail,
        handleLogout,
        loading,
        error,
        handleResetError,
        handleValidateResponse: (error: any) => {
          let message: string | null = null;
          let type: 'error' | 'warning' | 'info' | 'success' | 'default' =
            'default';

          if (error) {
            const regex = {
              firebase: /Firebase:/,
              slug: /\([^()]*\)./g,
              full: /Firebase:|\([^()]*\)./g,
            };

            const slug = error.code.replace(regex.slug, '').trim();

            if (error.message) {
              message = error.message.replace(regex.full, '').trim();

              if (message !== null) {
                const first = message.indexOf('.');

                if (first !== -1) message = message.substring(0, first + 1);
                if (message && slug)
                  return {
                    message,
                    slug,
                    type: 'error',
                  };
              }

              setError(message);
            }
          }

          if (message === null || message === '')
            message = 'An error occurred. Please try again.';

          return {
            message,
            slug: null,
            type,
          };
        },
      }}
    >
      {user && <button onClick={handleLogout}>Sign out</button>}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
