import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Learning from "@/pages/Learning";
import WordMemory from "@/pages/learning/WordMemory";
import Grammar from "@/pages/learning/Grammar";
import Speaking from "@/pages/learning/Speaking";
import Listening from "@/pages/learning/Listening";
import Profile from "@/pages/Profile";
import Community from "@/pages/Community";
import { isSupabaseConfigured } from "./lib/supabase";

// 受保护的路由组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">加载中...</div>;
  }
  
  // 如果没有配置Supabase，直接显示内容，不要求登录
  if (!isSupabaseConfigured()) {
    return children;
  }
  
  // 只有在配置了Supabase时才要求登录
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  
  return children;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 认证相关路由 */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* 受保护的路由 */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
          <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
          <Route path="/learning/word-memory" element={<ProtectedRoute><WordMemory /></ProtectedRoute>} />
          <Route path="/learning/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
          <Route path="/learning/speaking" element={<ProtectedRoute><Speaking /></ProtectedRoute>} />
          <Route path="/learning/listening" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
