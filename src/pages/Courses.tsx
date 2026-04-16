import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../services/recommendationService';
import { User, BookOpen, Search, ArrowRight } from 'lucide-react';

const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '初级';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-primary-100 text-primary-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-primary-100 text-primary-800';
    }
  };
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
                <a href="/courses" className="text-primary-600 border-primary-600 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
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

      {/* 页面内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
            课程中心
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-600">
            浏览我们的分级课程体系，选择适合您的学习内容
          </p>
        </div>

        {/* 课程筛选 */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-6 border-b border-secondary-200">
            <h3 className="text-xl font-semibold text-secondary-900">
              课程筛选
            </h3>
          </div>
          <div className="border-t border-secondary-200 px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-secondary-700 mb-2">
                  难度等级
                </label>
                <select
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-secondary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg transition-all duration-200"
                >
                  <option value="all">全部等级</option>
                  <option value="beginner">初级</option>
                  <option value="intermediate">中级</option>
                  <option value="advanced">高级</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-2">
                  分类
                </label>
                <select
                  id="category"
                  className="block w-full pl-3 pr-10 py-3 text-base border-secondary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg transition-all duration-200"
                >
                  <option value="all">全部分类</option>
                  <option value="基础">基础</option>
                  <option value="编程">编程</option>
                  <option value="统计">统计</option>
                  <option value="可视化">可视化</option>
                  <option value="机器学习">机器学习</option>
                  <option value="项目">项目</option>
                </select>
              </div>
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-2">
                  搜索课程
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-secondary-300 rounded-lg transition-all duration-200"
                    placeholder="输入课程名称"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-secondary-900 mb-8">
            全部课程 ({filteredCourses.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
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
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                        {getLevelText(course.level)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-secondary-600">
                      预计学习时间: {course.estimatedTime}小时
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center group transition-colors duration-200"
                    >
                      查看详情
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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

export default Courses;