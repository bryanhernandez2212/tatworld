import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type UserRole = "client" | "artist" | "supplier" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole | null;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  city?: string;
  is_minor?: boolean;
  styles?: string[];
  price_range?: string;
  instagram?: string;
  company_name?: string;
  description?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  authUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; name: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  setRole: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string, email?: string): Promise<UserProfile | null> => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    const role = roles && roles.length > 0 ? (roles[0].role as UserRole) : null;

    if (profile) {
      return {
        id: profile.id,
        email: profile.email || email || "",
        name: profile.name,
        role,
        avatar_url: profile.avatar_url || undefined,
        bio: profile.bio || undefined,
        phone: profile.phone || undefined,
        city: profile.city || undefined,
        is_minor: profile.is_minor || undefined,
        styles: profile.styles || undefined,
        price_range: profile.price_range || undefined,
        instagram: profile.instagram || undefined,
        company_name: profile.company_name || undefined,
        description: profile.description || undefined,
      };
    }
    return null;
  };

  const refreshProfile = async () => {
    if (!authUser) return;
    const profile = await fetchProfile(authUser.id, authUser.email);
    if (profile) setUser(profile);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setAuthUser(session.user);
        const profile = await fetchProfile(session.user.id, session.user.email);
        setUser(profile);
      } else {
        setAuthUser(null);
        setUser(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setAuthUser(session.user);
        const profile = await fetchProfile(session.user.id, session.user.email);
        setUser(profile);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const register = async (data: { email: string; password: string; name: string }) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthUser(null);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!authUser) return;
    const { role, email, id, ...profileData } = data as any;
    await supabase.from("profiles").update(profileData).eq("id", authUser.id);
    await refreshProfile();
  };

  const setRole = async (role: UserRole) => {
    if (!authUser) return { success: false, error: "No autenticado" };
    const { error } = await supabase.from("user_roles").insert({ user_id: authUser.id, role });
    if (error) return { success: false, error: error.message };
    await refreshProfile();
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, authUser, isLoading, login, register, logout, updateProfile, setRole, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
