import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null | { id: string; email: string } | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | { id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      const initializeAuth = async () => {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user ?? null);
        setLoading(false);
      };

      initializeAuth();

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // 使用模拟用户数据
      setUser({ id: 'mock-user-id', email: 'demo@example.com' });
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } else {
      // 模拟注册
      setUser({ id: 'new-user-id', email });
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else {
      // 模拟登录
      setUser({ id: 'mock-user-id', email });
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } else {
      // 模拟登出
      setUser(null);
    }
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } else {
      // 模拟密码重置
      console.log('Password reset email sent to:', email);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, resetPassword }}>
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