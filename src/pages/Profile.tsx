import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">总学习时长</h4>
                <p className="mt-1 text-2xl font-semibold text-gray-900">45小时</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">已完成课程</h4>
                <p className="mt-1 text-2xl font-semibold text-gray-900">2门</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">获得成就</h4>
                <p className="mt-1 text-2xl font-semibold text-gray-900">5个</p>
              </div>
            </div>
          </div>
        </div>

        {/* 个性化学习路径 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              个性化学习路径
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">数据分析基础</h4>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  已完成
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">商务数据可视化</h4>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  进行中
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">Python数据分析</h4>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  未开始
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">数据分析与决策</h4>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  未开始
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 成就系统 */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              成就系统
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* 成就徽章 1 */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">初学者</h4>
                <p className="text-xs text-gray-500">完成第一门课程</p>
              </div>
              
              {/* 成就徽章 2 */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="h-12 w-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">坚持不懈</h4>
                <p className="text-xs text-gray-500">连续学习7天</p>
              </div>
              
              {/* 成就徽章 3 */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="h-12 w-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">知识达人</h4>
                <p className="text-xs text-gray-500">完成5个学习模块</p>
              </div>
              
              {/* 成就徽章 4 */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="h-12 w-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">社交达人</h4>
                <p className="text-xs text-gray-500">在社区发布10个帖子</p>
              </div>
              
              {/* 成就徽章 5 */}
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="h-12 w-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">测试能手</h4>
                <p className="text-xs text-gray-500">测评成绩达到90分以上</p>
              </div>
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