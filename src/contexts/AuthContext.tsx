import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  city?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: () => void;
  register: (data: { email: string; password: string; name: string; city?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "tattsnearby_users";
const SESSION_KEY = "tattsnearby_session";

function getStoredUsers(): Array<{ profile: UserProfile; password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = getStoredUsers();
      const found = users.find((u) => u.profile.id === sessionId);
      if (found) setUser(found.profile);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.profile.email === email && u.password === password);
    if (!found) return { success: false, error: "Correo o contraseña incorrectos" };
    setUser(found.profile);
    localStorage.setItem(SESSION_KEY, found.profile.id);
    return { success: true };
  };

  const quickLogin = () => {
    const mockProfile: UserProfile = {
      id: "mock-user-001",
      email: "usuario@tattsnearby.com",
      name: "Usuario Demo",
      city: "Ciudad de México",
      createdAt: new Date().toISOString(),
    };
    setUser(mockProfile);
    localStorage.setItem(SESSION_KEY, mockProfile.id);
    const users = getStoredUsers();
    if (!users.find((u) => u.profile.id === mockProfile.id)) {
      users.push({ profile: mockProfile, password: "demo" });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  const register = async (data: { email: string; password: string; name: string; city?: string }) => {
    const users = getStoredUsers();
    if (users.find((u) => u.profile.email === data.email)) {
      return { success: false, error: "Este correo ya está registrado" };
    }
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      city: data.city,
      createdAt: new Date().toISOString(),
    };
    users.push({ profile, password: data.password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, profile.id);
    setUser(profile);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.profile.id === user.id);
    if (idx !== -1) {
      users[idx].profile = updated;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
