import { AuthProvider } from "@/contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// 导入页面组件
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Learning from "@/pages/Learning";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import LessonContent from "@/pages/LessonContent";
import CodeEditorPage from "@/pages/CodeEditorPage";

// 导入学习模块
import WordMemory from "@/pages/learning/WordMemory";
import Grammar from "@/pages/learning/Grammar";
import Speaking from "@/pages/learning/Speaking";
import Listening from "@/pages/learning/Listening";
import Assessment from "@/pages/learning/Assessment";

// 导入保护路由
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;