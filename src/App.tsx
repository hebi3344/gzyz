import { AuthProvider } from "@/contexts/AuthContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./index.css";
import { ToastContainer } from "@/components/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loading } from "@/components/Loading";
import { NetworkStatusBanner } from "@/hooks/useNetwork";

// 懒加载页面组件
const Home = lazy(() => import("@/pages/Home"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const Learning = lazy(() => import("@/pages/Learning"));
const Community = lazy(() => import("@/pages/Community"));
const Profile = lazy(() => import("@/pages/Profile"));
const LessonContent = lazy(() => import("@/pages/LessonContent"));
const CodeEditorPage = lazy(() => import("@/pages/CodeEditorPage"));

// 懒加载学习模块
const WordMemory = lazy(() => import("@/pages/learning/WordMemory"));
const Grammar = lazy(() => import("@/pages/learning/Grammar"));
const Speaking = lazy(() => import("@/pages/learning/Speaking"));
const Listening = lazy(() => import("@/pages/learning/Listening"));
const Assessment = lazy(() => import("@/pages/learning/Assessment"));

// 导入保护路由
import ProtectedRoute from "@/components/ProtectedRoute";

// 加载状态组件
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FeedbackProvider>
          <NetworkStatusBanner />
          <Router>
            <Suspense fallback={<Loading fullScreen text="加载页面中..." />}>
              <Routes>
                {/* 公共路由 */}
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/learn" element={<LessonContent />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/learning/word-memory" element={<WordMemory />} />
                <Route path="/learning/grammar" element={<Grammar />} />
                <Route path="/learning/speaking" element={<Speaking />} />
                <Route path="/learning/listening" element={<Listening />} />
                <Route path="/learning/assessment/:id" element={<Assessment />} />
                <Route path="/code-editor" element={<CodeEditorPage />} />
                
                {/* 需要登录的路由 */}
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </Router>
          <ToastContainer />
        </FeedbackProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;