import React, { useState, useEffect } from 'react';

const WordMemory: React.FC = () => {
  // 模拟单词数据
  const words = [
    // 基础术语
    { id: 1, word: 'data analysis', meaning: '数据分析' },
    { id: 2, word: 'data visualization', meaning: '数据可视化' },
    { id: 3, word: 'statistical analysis', meaning: '统计分析' },
    { id: 4, word: 'machine learning', meaning: '机器学习' },
    { id: 5, word: 'business intelligence', meaning: '商业智能' },
    { id: 6, word: 'data mining', meaning: '数据挖掘' },
    { id: 7, word: 'data preprocessing', meaning: '数据预处理' },
    { id: 8, word: 'data collection', meaning: '数据收集' },
    { id: 9, word: 'data quality', meaning: '数据质量' },
    { id: 10, word: 'data warehouse', meaning: '数据仓库' },
    
    // Python相关术语
    { id: 11, word: 'NumPy', meaning: 'Python数值计算库' },
    { id: 12, word: 'Pandas', meaning: 'Python数据分析库' },
    { id: 13, word: 'Matplotlib', meaning: 'Python数据可视化库' },
    { id: 14, word: 'Seaborn', meaning: 'Python统计数据可视化库' },
    { id: 15, word: 'Scikit-learn', meaning: 'Python机器学习库' },
    { id: 16, word: 'DataFrame', meaning: 'Pandas中的数据结构' },
    { id: 17, word: 'Series', meaning: 'Pandas中的一维数据结构' },
    { id: 18, word: 'array', meaning: 'NumPy中的数组' },
    { id: 19, word: 'data cleaning', meaning: '数据清洗' },
    { id: 20, word: 'data transformation', meaning: '数据转换' },
    { id: 21, word: 'data aggregation', meaning: '数据聚合' },
    { id: 22, word: 'time series', meaning: '时间序列' },
    { id: 23, word: 'correlation', meaning: '相关性' },
    { id: 24, word: 'regression', meaning: '回归分析' },
    { id: 25, word: 'classification', meaning: '分类' },
    { id: 26, word: 'clustering', meaning: '聚类' },
    { id: 27, word: 'feature engineering', meaning: '特征工程' },
    { id: 28, word: 'model training', meaning: '模型训练' },
    { id: 29, word: 'model evaluation', meaning: '模型评估' },
    { id: 30, word: 'cross-validation', meaning: '交叉验证' },
    
    // 商务数据分析术语
    { id: 31, word: 'business analytics', meaning: '商务分析' },
    { id: 32, word: 'key performance indicator', meaning: '关键绩效指标(KPI)' },
    { id: 33, word: 'dashboard', meaning: '仪表板' },
    { id: 34, word: 'reporting', meaning: '报表' },
    { id: 35, word: 'forecasting', meaning: '预测' },
    { id: 36, word: 'market analysis', meaning: '市场分析' },
    { id: 37, word: 'customer analytics', meaning: '客户分析' },
    { id: 38, word: 'sales analysis', meaning: '销售分析' },
    { id: 39, word: 'financial analysis', meaning: '财务分析' },
    { id: 40, word: 'risk analysis', meaning: '风险分析' },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const currentWord = words[currentWordIndex];

  const handleNext = () => {
    setShowMeaning(false);
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
  };

  const handleShowMeaning = () => {
    setShowMeaning(true);
  };

  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    setTotalAttempts((prev) => prev + 1);
    handleNext();
  };

  const handleIncorrect = () => {
    setTotalAttempts((prev) => prev + 1);
    handleNext();
  };

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            单词记忆
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            记忆数据分析相关术语，提升专业词汇量
          </p>
        </div>

        {/* 单词卡片 */}
        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              {currentWord.word}
            </h3>
            
            {!showMeaning ? (
              <button
                onClick={handleShowMeaning}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                查看释义
              </button>
            ) : (
              <div className="mt-6">
                <p className="text-2xl text-gray-700 mb-8">
                  {currentWord.meaning}
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleCorrect}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    记得
                  </button>
                  <button
                    onClick={handleIncorrect}
                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    不记得
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-500">正确率</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0}%
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-500">已练习单词</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {totalAttempts}
              </p>
            </div>
          </div>
        </div>

        {/* 单词列表 */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            单词列表
          </h3>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    单词
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    释义
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {words.map((word) => (
                  <tr key={word.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{word.word}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{word.meaning}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default WordMemory;