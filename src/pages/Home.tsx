import React, { useEffect, useState } from 'react';
import { getRecommendedCourses, getLearningPath } from '../services/recommendationService';
import { useProgress } from '../hooks/useProgress';

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
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-600">数据分析学习平台</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  首页
                </a>
                <a href="/courses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  课程中心
                </a>
                <a href="/learning" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  学习中心
                </a>
                <a href="/community" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  社区中心
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a href="/profile" className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">查看个人资料</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              数据分析学习平台
            </h2>
            <p className="mt-3 max-w-3xl mx-auto text-xl text-blue-100 sm:mt-5">
              专为商务数据分析与应用专业学生设计的在线教育平台，支持多语种学习
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <a href="/courses" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10">
                  浏览课程
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="/learning" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10">
                  开始学习
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 课程推荐 */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              推荐课程
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              基于您的学习兴趣和进度，我们为您推荐以下课程
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-center">
                    <div className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center ${course.level === 'beginner' ? 'bg-blue-100' : course.level === 'intermediate' ? 'bg-green-100' : 'bg-purple-100'}`}>
                      <svg className={`h-6 w-6 ${course.level === 'beginner' ? 'text-blue-600' : course.level === 'intermediate' ? 'text-green-600' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {course.level === 'beginner' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                        {course.level === 'intermediate' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        )}
                        {course.level === 'advanced' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        )}
                      </svg>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">{course.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {course.description}
                    </p>
                    <div className="mt-5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.level === 'beginner' ? 'bg-blue-100 text-blue-800' : course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      预计学习时间: {course.estimatedTime}小时
                    </div>
                    <a href={`/courses/${course.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      查看详情
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习进度 */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              学习进度
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              查看您的学习状态和最近学习的课程
            </p>
          </div>

          <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                最近学习
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        数据分析基础
                      </div>
                      <div className="text-sm text-gray-500">
                        上次学习: 今天 14:30
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex items-center">
                    <div className="w-32">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="ml-3 text-sm text-gray-500">
                      65%
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        商务数据可视化
                      </div>
                      <div className="text-sm text-gray-500">
                        上次学习: 昨天 16:45
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex items-center">
                    <div className="w-32">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div className="ml-3 text-sm text-gray-500">
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
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              个性化学习路径
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              根据您的学习进度，我们为您定制了以下学习路径
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {learningPath.map((path, index) => (
              <div key={path.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {path.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${path.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {path.completed ? '已完成' : '进行中'}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {path.courses.map((course: any) => (
                      <div key={course.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${course.level === 'beginner' ? 'bg-blue-100' : course.level === 'intermediate' ? 'bg-green-100' : 'bg-purple-100'}`}>
                          <span className={`text-xs font-medium ${course.level === 'beginner' ? 'text-blue-600' : course.level === 'intermediate' ? 'text-green-600' : 'text-purple-600'}`}>
                            {course.level === 'beginner' ? '初' : course.level === 'intermediate' ? '中' : '高'}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {course.title}
                          </div>
                          <div className="text-xs text-gray-500">
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
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-medium">数据分析学习平台</h3>
              <p className="mt-2 text-gray-300 text-sm">
                专为商务数据分析与应用专业学生设计的在线教育平台
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">快速链接</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white text-sm">首页</a></li>
                <li><a href="/courses" className="text-gray-300 hover:text-white text-sm">课程中心</a></li>
                <li><a href="/learning" className="text-gray-300 hover:text-white text-sm">学习中心</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-white text-sm">社区中心</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">联系我们</h3>
              <p className="mt-2 text-gray-300 text-sm">
                邮箱: contact@example.com
              </p>
              <p className="mt-1 text-gray-300 text-sm">
                电话: +86 123 4567 8910
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 数据分析学习平台. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;