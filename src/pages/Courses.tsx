import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../services/recommendationService';
import { User, BookOpen, Search, ArrowRight, Filter, X, Sparkles } from 'lucide-react';

// 搜索高亮组件
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 text-secondary-900 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

// 防抖 Hook
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// 获取所有分类
const getAllCategories = () => {
  const categories = [...new Set(courses.map(course => course.category))];
  return ['全部', ...categories.sort()];
};

const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // 过滤课程
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesCategory = selectedCategory === '全部' || course.category === selectedCategory;
      const matchesSearch = debouncedSearchTerm.trim() === '' || 
        course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        course.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return matchesLevel && matchesCategory && matchesSearch;
    });
  }, [selectedLevel, selectedCategory, debouncedSearchTerm]);
  
  // 搜索状态
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
    setIsSearching(false);
  }, [debouncedSearchTerm, searchTerm]);
  
  // 键盘快捷键：Ctrl+K 或 Cmd+K 聚焦搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchTerm('');
        searchInputRef.current?.blur();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // 清除筛选
  const clearFilters = () => {
    setSelectedLevel('all');
    setSelectedCategory('全部');
    setSearchTerm('');
  };
  
  const hasActiveFilters = selectedLevel !== 'all' || selectedCategory !== '全部' || searchTerm.trim() !== '';
  
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
  
  const getLevelIconColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-primary-600';
      case 'intermediate': return 'text-green-600';
      case 'advanced': return 'text-purple-600';
      default: return 'text-primary-600';
    }
  };
  
  const getLevelBgColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-primary-100';
      case 'intermediate': return 'bg-green-100';
      case 'advanced': return 'bg-purple-100';
      default: return 'bg-primary-100';
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
          <div className="px-6 py-6 border-b border-secondary-200 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-secondary-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              课程筛选
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center transition-colors duration-200"
              >
                <X className="w-4 h-4 mr-1" />
                清除筛选
              </button>
            )}
          </div>
          <div className="border-t border-secondary-200 px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 搜索框 */}
              <div className="lg:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-2">
                  搜索课程 <span className="text-xs text-secondary-400">(Ctrl+K)</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                    ) : (
                      <Search className="h-5 w-5 text-secondary-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    ref={searchInputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-10 py-3 sm:text-sm border-secondary-300 rounded-lg transition-all duration-200"
                    placeholder="输入课程名称或描述关键词"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-5 w-5 text-secondary-400 hover:text-secondary-600 transition-colors duration-200" />
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <p className="mt-2 text-sm text-secondary-600">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    正在搜索: "{searchTerm}"
                  </p>
                )}
              </div>
              
              {/* 难度等级 */}
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
              
              {/* 分类 */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-2">
                  分类
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-secondary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg transition-all duration-200"
                >
                  {getAllCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* 活跃筛选标签 */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-secondary-200">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-secondary-600">活跃筛选:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      搜索: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-2">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedLevel !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {getLevelText(selectedLevel)}
                      <button onClick={() => setSelectedLevel('all')} className="ml-2">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== '全部' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('全部')} className="ml-2">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 课程列表 */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-secondary-900">
              {searchTerm || hasActiveFilters ? '搜索结果' : '全部课程'} 
              <span className="ml-2 text-lg font-normal text-secondary-600">
                ({filteredCourses.length} {filteredCourses.length === 1 ? '个课程' : '个课程'})
              </span>
            </h3>
            {(searchTerm || hasActiveFilters) && filteredCourses.length > 0 && (
              <p className="text-sm text-secondary-600">
                基于您的筛选条件找到 {filteredCourses.length} 个课程
              </p>
            )}
          </div>
          
          {/* 无结果提示 */}
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 mb-4">
                <Search className="h-8 w-8 text-secondary-400" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                未找到匹配的课程
              </h3>
              <p className="text-secondary-600 mb-6">
                尝试调整您的筛选条件或搜索关键词
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="text-sm text-secondary-500">试试搜索:</span>
                {['Python', '可视化', '机器学习', '统计分析'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="px-3 py-1 text-sm bg-secondary-100 text-secondary-700 rounded-full hover:bg-secondary-200 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                清除所有筛选条件
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className="text-center">
                      <div className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${getLevelBgColor(course.level)}`}>
                        <BookOpen className={`h-8 w-8 ${getLevelIconColor(course.level)}`} />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-secondary-900">
                        <HighlightText text={course.title} highlight={debouncedSearchTerm} />
                      </h3>
                      <p className="mt-3 text-secondary-600 text-sm">
                        <HighlightText text={course.description} highlight={debouncedSearchTerm} />
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
          )}
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