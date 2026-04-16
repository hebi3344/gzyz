import React, { useEffect, useState } from 'react';
import { getRecommendedCourses, getLearningPath } from '../services/recommendationService';
import { useProgress } from '../hooks/useProgress';
import { User, BookOpen, BarChart3, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [learningPath, setLearningPath] = useState<any[]>([]);
  const { progress, completedModules } = useProgress();

  useEffect(() => {
    // 获取推荐课程
    const courses = getRecommendedCourses();
    setRecommendedCourses(courses);

    // 获取学习路径
    const path = getLearningPath();
    setLearningPath(path);
  }, [progress, completedModules]);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary-600">数据分析学习平台</h1>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <a href="/" className="text-primary-600 border-primary-600 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
                  首页
                </a>
                <a href="/courses" className="text-secondary-600 hover:text-primary-600 hover:border-primary-600 inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  课程中心
                </a>
                <a href="/learning" className="text-secondary-600 hover:text-primary-600 hover:border-primary-600 inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  学习中心
                </a>
                <a href="/community" className="text-secondary-600 hover:text-primary-600 hover:border-primary-600 inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  社区中心
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a href="/profile" className="ml-4 p-2 rounded-full text-secondary-400 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                <span className="sr-only">查看个人资料</span>
                <User className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              数据分析学习平台
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              专为商务数据分析与应用专业学生设计的在线教育平台，支持多语种学习，助力您掌握数据分析核心技能
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/courses" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-700 bg-white hover:bg-primary-50 md:py-4 md:text-lg md:px-10 shadow-lg transition-all duration-300 transform hover:scale-105">
                浏览课程
              </a>
              <a href="/learning" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-700 hover:bg-primary-800 md:py-4 md:text-lg md:px-10 shadow-lg transition-all duration-300 transform hover:scale-105">
                开始学习
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 特色功能 */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">丰富的课程内容</h3>
              <p className="text-secondary-600">
                涵盖数据分析基础、商务数据可视化、机器学习等多个领域的精品课程
              </p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">个性化学习路径</h3>
              <p className="text-secondary-600">
                根据您的学习进度和兴趣，为您定制专属的学习计划和推荐课程
              </p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">活跃的学习社区</h3>
              <p className="text-secondary-600">
                与同学和导师交流学习心得，分享经验，共同进步
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程推荐 */}
      <div className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
              推荐课程
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
              基于您的学习兴趣和进度，我们为您推荐以下课程
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="p-6">
                  <div className="text-center">
                    <div className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${course.level === 'beginner' ? 'bg-primary-100' : course.level === 'intermediate' ? 'bg-green-100' : 'bg-purple-100'}`}>
                      <BookOpen className={`h-8 w-8 ${course.level === 'beginner' ? 'text-primary-600' : course.level === 'intermediate' ? 'text-green-600' : 'text-purple-600'}`} />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-secondary-900">{course.title}</h3>
                    <p className="mt-3 text-secondary-600">
                      {course.description}
                    </p>
                    <div className="mt-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${course.level === 'beginner' ? 'bg-primary-100 text-primary-800' : course.level === 'intermediate' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                        {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-secondary-600">
                      预计学习时间: {course.estimatedTime}小时
                    </div>
                    <a href={`/courses/${course.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center group">
                      查看详情
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习进度 */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
              学习进度
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
              查看您的学习状态和最近学习的课程
            </p>
          </div>

          <div className="mt-12 bg-secondary-50 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-6 border-b border-secondary-200">
              <h3 className="text-xl font-semibold text-secondary-900">
                最近学习
              </h3>
            </div>
            <div className="divide-y divide-secondary-200">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-secondary-900">
                        数据分析基础
                      </div>
                      <div className="text-sm text-secondary-600">
                        上次学习: 今天 14:30
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex items-center">
                    <div className="w-40">
                      <div className="w-full bg-secondary-200 rounded-full h-3">
                        <div className="bg-primary-600 h-3 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="ml-3 text-sm font-medium text-secondary-900">
                      65%
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-secondary-900">
                        商务数据可视化
                      </div>
                      <div className="text-sm text-secondary-600">
                        上次学习: 昨天 16:45
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex items-center">
                    <div className="w-40">
                      <div className="w-full bg-secondary-200 rounded-full h-3">
                        <div className="bg-primary-600 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div className="ml-3 text-sm font-medium text-secondary-900">
                      30%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
              个性化学习路径
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
              根据您的学习进度，我们为您定制了以下学习路径
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {learningPath.map((path, index) => (
              <div key={path.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="px-6 py-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-secondary-900">
                      {path.title}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${path.completed ? 'bg-green-100 text-green-800' : 'bg-primary-100 text-primary-800'}`}>
                      {path.completed ? '已完成' : '进行中'}
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {path.courses.map((course: any) => (
                      <div key={course.id} className="flex items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${course.level === 'beginner' ? 'bg-primary-100' : course.level === 'intermediate' ? 'bg-green-100' : 'bg-purple-100'}`}>
                          <span className={`text-sm font-medium ${course.level === 'beginner' ? 'text-primary-600' : course.level === 'intermediate' ? 'text-green-600' : 'text-purple-600'}`}>
                            {course.level === 'beginner' ? '初' : course.level === 'intermediate' ? '中' : '高'}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-secondary-900">
                            {course.title}
                          </div>
                          <div className="text-xs text-secondary-600">
                            {course.estimatedTime}小时
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-secondary-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold">数据分析学习平台</h3>
              <p className="mt-4 text-secondary-400">
                专为商务数据分析与应用专业学生设计的在线教育平台，助力您掌握数据分析核心技能
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">快速链接</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="/" className="text-secondary-400 hover:text-white transition-colors duration-200">首页</a></li>
                <li><a href="/courses" className="text-secondary-400 hover:text-white transition-colors duration-200">课程中心</a></li>
                <li><a href="/learning" className="text-secondary-400 hover:text-white transition-colors duration-200">学习中心</a></li>
                <li><a href="/community" className="text-secondary-400 hover:text-white transition-colors duration-200">社区中心</a></li>
                <li><a href="/profile" className="text-secondary-400 hover:text-white transition-colors duration-200">个人资料</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">联系我们</h3>
              <p className="mt-4 text-secondary-400">
                邮箱: contact@example.com
              </p>
              <p className="mt-2 text-secondary-400">
                电话: +86 123 4567 8910
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-secondary-800 pt-8 text-center">
            <p className="text-secondary-500">
              © 2026 数据分析学习平台. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;