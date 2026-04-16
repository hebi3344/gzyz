import React from 'react';
import { User, BookOpen, FileText, Mic, Headphones, Play } from 'lucide-react';

const Learning: React.FC = () => {
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
                <a href="/" className="text-secondary-600 hover:text-primary-600 hover:border-primary-600 inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  首页
                </a>
                <a href="/courses" className="text-secondary-600 hover:text-primary-600 hover:border-primary-600 inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  课程中心
                </a>
                <a href="/learning" className="text-primary-600 border-primary-600 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
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

      {/* 页面内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
            学习中心
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
            参与互动式学习模块，提升您的数据分析技能
          </p>
        </div>

        {/* 学习模块 */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 单词记忆模块 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary-900">单词记忆</h3>
                <p className="mt-3 text-secondary-600">
                  通过交互式练习记忆数据分析相关术语
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 px-6 py-4">
              <a href="/learning/word-memory" className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105">
                开始练习
              </a>
            </div>
          </div>

          {/* 语法练习模块 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary-900">语法练习</h3>
                <p className="mt-3 text-secondary-600">
                  练习数据分析相关的语法规则和表达
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 px-6 py-4">
              <a href="/learning/grammar" className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105">
                开始练习
              </a>
            </div>
          </div>

          {/* 口语跟读模块 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <Mic className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary-900">口语跟读</h3>
                <p className="mt-3 text-secondary-600">
                  通过语音识别练习数据分析相关术语的发音
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 px-6 py-4">
              <a href="/learning/speaking" className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105">
                开始练习
              </a>
            </div>
          </div>

          {/* 听力训练模块 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <Headphones className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary-900">听力训练</h3>
                <p className="mt-3 text-secondary-600">
                  提高数据分析相关内容的听力理解能力
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 px-6 py-4">
              <a href="/learning/listening" className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105">
                开始练习
              </a>
            </div>
          </div>
        </div>

        {/* 练习测评系统 */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-secondary-900 mb-8">
            练习测评系统
          </h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-6 border-b border-secondary-200">
              <h4 className="text-xl font-semibold text-secondary-900">
                章节测试
              </h4>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors duration-200">
                  <div className="flex-1">
                    <h5 className="font-semibold text-secondary-900">数据分析基础 - 第一章</h5>
                    <p className="mt-2 text-sm text-secondary-600">10道题目，限时30分钟</p>
                  </div>
                  <a href="/learning/assessment/1" className="mt-4 sm:mt-0 px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    开始测试
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors duration-200">
                  <div className="flex-1">
                    <h5 className="font-semibold text-secondary-900">商务数据可视化 - 第二章</h5>
                    <p className="mt-2 text-sm text-secondary-600">15道题目，限时45分钟</p>
                  </div>
                  <a href="/learning/assessment/2" className="mt-4 sm:mt-0 px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    开始测试
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-secondary-900 py-16 mt-16">
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

export default Learning;