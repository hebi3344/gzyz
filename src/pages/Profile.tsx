import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgressStore } from '../store/useProgressStore';
import { ProgressVisualization } from '../components/ProgressVisualization';
import { Trophy, Clock, Award, TrendingUp, Zap } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const {
    progress,
    completedModules,
    totalLearningTime,
    unlockedAchievements,
    achievements,
    currentStreak
  } = useProgressStore();

  const completedCoursesCount = Object.values(progress).filter(p => p >= 100).length;
  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;

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
                <a href="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            个人中心
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            查看您的学习统计、个性化学习路径和成就
          </p>
        </div>

        {/* 用户信息 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              个人信息
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">
                  {user?.email}
                </h4>
                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={signOut}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 学习统计 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              学习统计
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-600">总学习时长</h4>
                    <p className="mt-1 text-2xl font-bold text-blue-900">
                      {Math.floor(totalLearningTime / 60)}小时 {(totalLearningTime % 60)}分钟
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-green-600">已完成课程</h4>
                    <p className="mt-1 text-2xl font-bold text-green-900">{completedCoursesCount}门</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-600">获得成就</h4>
                    <p className="mt-1 text-2xl font-bold text-purple-900">{unlockedCount}/{totalAchievements}个</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-orange-600">学习连续</h4>
                    <p className="mt-1 text-2xl font-bold text-orange-900">{currentStreak}天</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 详细进度可视化 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              学习进度详情
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <ProgressVisualization courseId="all" />
          </div>
        </div>

        {/* 课程进度 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              课程进度概览
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="space-y-4">
              {Object.entries(progress).length > 0 ? (
                Object.entries(progress).map(([courseId, courseProgress]) => {
                  const status = courseProgress >= 100 ? '已完成' : courseProgress > 0 ? '进行中' : '未开始';
                  const statusColor = courseProgress >= 100 ? 'green' : courseProgress > 0 ? 'yellow' : 'gray';
                  return (
                    <div key={courseId} className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        courseProgress >= 100
                          ? 'bg-green-100'
                          : courseProgress > 0
                          ? 'bg-yellow-100'
                          : 'bg-gray-100'
                      }`}>
                        {courseProgress >= 100 ? (
                          <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : courseProgress > 0 ? (
                          <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{courseId}</h4>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              courseProgress >= 100
                                ? 'bg-gradient-to-r from-green-400 to-green-500'
                                : courseProgress > 0
                                ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                                : 'bg-gray-300'
                            }`}
                            style={{ width: `${courseProgress}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>暂无课程进度数据</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 成就系统 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
              成就系统 ({unlockedCount}/{totalAchievements})
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                const colorMap = {
                  blue: 'bg-blue-500',
                  green: 'bg-green-500',
                  purple: 'bg-purple-500',
                  orange: 'bg-orange-500',
                  yellow: 'bg-yellow-500',
                  red: 'bg-red-500'
                };
                const textColorMap = {
                  blue: 'text-blue-600',
                  green: 'text-green-600',
                  purple: 'text-purple-600',
                  orange: 'text-orange-600',
                  yellow: 'text-yellow-600',
                  red: 'text-red-600'
                };
                const bgColorMap = {
                  blue: 'bg-blue-100',
                  green: 'bg-green-100',
                  purple: 'bg-purple-100',
                  orange: 'bg-orange-100',
                  yellow: 'bg-yellow-100',
                  red: 'bg-red-100'
                };

                return (
                  <div
                    key={achievement.id}
                    className={`relative group p-4 rounded-xl transition-all duration-300 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md hover:shadow-lg hover:-translate-y-1'
                        : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div
                      className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${
                        isUnlocked ? colorMap[achievement.color as keyof typeof colorMap] : 'bg-gray-300'
                      }`}
                    >
                      <svg
                        className={`h-8 w-8 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={achievement.icon}
                        />
                      </svg>
                    </div>
                    <h4 className="mt-3 text-sm font-semibold text-gray-900 text-center">
                      {achievement.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-600 text-center">
                      {achievement.description}
                    </p>
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white">
                          <Trophy className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">未解锁</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 py-12 mt-12">
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

export default Profile;