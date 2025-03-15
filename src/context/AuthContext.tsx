import React, { createContext, useEffect, useState } from "react";
import {
  STORAGE_KEYS,
  LocalStorageService,
} from "../services/LocalStorageService";
import { AppUser } from "../models/User";
import { ApiResponse } from "../types/ApiResponse";

interface AuthContextType {
  appUser: AppUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<string | null>;
  logout: () => void;
  resetLoading: () => void;
  clearError: () => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedUser = LocalStorageService.getItem<AppUser>(STORAGE_KEYS.USER);
    if (storedUser) {
      setAppUser(storedUser);
    }
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const refetchUser = () => {
    const storedUser = LocalStorageService.getItem<AppUser>(STORAGE_KEYS.USER);
    setAppUser(storedUser);
  };

  const login = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    setLoading(true);

    const users =
      LocalStorageService.getItem<AppUser[]>(STORAGE_KEYS.USER) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid login credentials.");
      setLoading(false);
      return "Invalid login credentials.";
    }

    setAppUser(user);
    if (rememberMe) {
      LocalStorageService.setItem(STORAGE_KEYS.USER, user);
    }
    setLoading(false);
    return null;
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<string | null> => {
    setLoading(true);

    const users =
      LocalStorageService.getItem<AppUser[]>(STORAGE_KEYS.USER) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setError("User already exists.");
      setLoading(false);
      return "User already exists.";
    }

    const newUser: AppUser = {
      id: LocalStorageService.generateId(),
      email,
      fullName,
      password,
    };

    users.push(newUser);
    LocalStorageService.setItem(STORAGE_KEYS.USER, users);
    setAppUser(newUser);

    setLoading(false);
    return null;
  };

  const logout = () => {
    setAppUser(null);
    // LocalStorageService.removeItem(STORAGE_KEYS.USER);
  };
  const resetLoading = () => setLoading(false);
  return (
    <AuthContext.Provider
      value={{
        appUser,
        loading,
        error,
        login,
        signup,
        logout,
        resetLoading,
        clearError,
        rememberMe,
        setRememberMe,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
