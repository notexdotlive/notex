'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  FirebaseUser,
  signInWithPopup,
  // EmailAuthProvider,
  // GoogleAuthProvider,
  GithubAuthProvider,
} from '@/services/firebase';

type AuthContextType = {
  user: FirebaseUser | null;
  role: 'admin' | 'user' | 'guest';
  // loginEmail: (email: string, password: string) => Promise<void>;
  // loginGoogle: () => Promise<void>;
  // loginGitHub: () => Promise<void>;
  // logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authApp = null;

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | 'guest'>('guest');

  // const handleLoginEmail = async (email: string, password: string) => {
  //   return new Promise<void>((resolve, reject) => {
  //     signInWithPopup(authApp, new EmailAuthProvider())
  //       .then((result) => {
  //         const { user: u } = result;

  //         setUser(u);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });

  //     setLoading(false);
  //   });
  // };

  // const handleLoginGoogle = async () => {
  //   return new Promise<void>((resolve, reject) => {
  //     signInWithPopup(authApp, new GoogleAuthProvider())
  //       .then((result) => {
  //         const { user: u } = result;

  //         setUser(u);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });

  //     setLoading(false);
  //   });
  // };

  // const handleLoginGitHub = async () => {
  //   return new Promise<void>((resolve, reject) => {
  //     signInWithPopup(authApp, new GithubAuthProvider())
  //       .then((result) => {
  //         const { user: u } = result;

  //         setUser(u);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });

  //     setLoading(false);
  //   });
  // };

  // const handleLogout = async () => {
  //   return new Promise<void>((resolve, reject) => {
  //     auth
  //       .signOut()
  //       .then(() => {
  //         setUser(null);
  //         resolve();
  //       })
  //       .catch((error: any) => {
  //         reject(error);
  //       });

  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   if (!auth) return;

  //   const unsubscribe = auth.onAuthStateChanged((u) => {
  //     setUser(u);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
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
