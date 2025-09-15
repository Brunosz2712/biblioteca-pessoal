// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI, fbAuth } from "../services/firebase";

type User = { uid: string; email: string | null; displayName?: string | null };

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthAPI.onAuthStateChanged(fbAuth, (u) => {
      setUser(u ? { uid: u.uid, email: u.email, displayName: u.displayName } : null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await AuthAPI.signInWithEmailAndPassword(fbAuth, email, password);
  };

  const register = async (email: string, password: string, name?: string) => {
    const cred = await AuthAPI.createUserWithEmailAndPassword(fbAuth, email, password);
    if (name) await AuthAPI.updateProfile(cred.user, { displayName: name });
  };

  const logout = async () => {
    await AuthAPI.signOut(fbAuth);
  };

  const resetPassword = async (email: string) => {
    await AuthAPI.sendPasswordResetEmail(fbAuth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
