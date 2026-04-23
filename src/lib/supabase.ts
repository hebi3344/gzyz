// 模拟Supabase对象 - 暂时禁用真实Supabase，直到配置了有效的环境变量
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: (callback: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: async (credentials: any) => ({ error: null }),
    signInWithPassword: async (credentials: any) => ({ error: null }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async (email: string) => ({ error: null })
  }
};

// 检查是否配置了真实的Supabase
export const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'your-supabase-url' && 
           supabaseAnonKey !== 'your-supabase-anon-key' &&
           (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')));
};