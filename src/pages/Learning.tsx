import React from 'react';

const Learning: React.FC = () => {
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
                <a href="/learning" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
            学习中心
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            参与互动式学习模块，提升您的数据分析技能
          </p>
        </div>

        {/* 学习模块 */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 单词记忆模块 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">单词记忆</h3>
                <p className="mt-2 text-sm text-gray-500">
                  通过交互式练习记忆数据分析相关术语
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <a href="/learning/word-memory" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                开始练习
              </a>
            </div>
          </div>

          {/* 语法练习模块 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">语法练习</h3>
                <p className="mt-2 text-sm text-gray-500">
                  练习数据分析相关的语法规则和表达
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <a href="/learning/grammar" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                开始练习
              </a>
            </div>
          </div>

          {/* 口语跟读模块 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">口语跟读</h3>
                <p className="mt-2 text-sm text-gray-500">
                  通过语音识别练习数据分析相关术语的发音
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <a href="/learning/speaking" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                开始练习
              </a>
            </div>
          </div>

          {/* 听力训练模块 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">听力训练</h3>
                <p className="mt-2 text-sm text-gray-500">
                  提高数据分析相关内容的听力理解能力
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <a href="/learning/listening" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                开始练习
              </a>
            </div>
          </div>
        </div>

        {/* 练习测评系统 */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            练习测评系统
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                章节测试
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div>
                    <h5 className="font-medium text-gray-900">数据分析基础 - 第一章</h5>
                    <p className="text-sm text-gray-500">10道题目，限时30分钟</p>
                  </div>
                  <a href="/learning/assessment/1" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    开始测试
                  </a>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div>
                    <h5 className="font-medium text-gray-900">商务数据可视化 - 第二章</h5>
                    <p className="text-sm text-gray-500">15道题目，限时45分钟</p>
                  </div>
                  <a href="/learning/assessment/2" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    开始测试
                  </a>
                </div>
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

export default Learning;