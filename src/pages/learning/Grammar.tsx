import React, { useState } from 'react';

const Grammar: React.FC = () => {
  // 模拟语法练习数据
  const exercises = [
    // Python基础语法
    {
      id: 1,
      question: 'Which Python library is used for data manipulation and analysis?',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'What is the correct syntax to import the pandas library?',
      options: ['import pandas', 'from pandas import *', 'import pandas as pd', 'import pandas.pyplot'],
      correctAnswer: 2
    },
    
    // Pandas操作
    {
      id: 3,
      question: 'Which function is used to read a CSV file in pandas?',
      options: ['read_csv()', 'load_csv()', 'import_csv()', 'csv_read()'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'What does the head() function do in pandas?',
      options: ['Returns the last n rows', 'Returns the first n rows', 'Returns a random sample of rows', 'Returns all rows'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Which method is used to group data in pandas?',
      options: ['group()', 'groupby()', 'aggregate()', 'split()'],
      correctAnswer: 1
    },
    
    // NumPy操作
    {
      id: 6,
      question: 'Which function is used to create an array in NumPy?',
      options: ['array()', 'create_array()', 'numpy_array()', 'make_array()'],
      correctAnswer: 0
    },
    {
      id: 7,
      question: 'What does np.mean() calculate?',
      options: ['Median', 'Mean', 'Mode', 'Standard deviation'],
      correctAnswer: 1
    },
    
    // 数据可视化
    {
      id: 8,
      question: 'Which method is used to create a data visualization in matplotlib?',
      options: ['plot()', 'chart()', 'graph()', 'visualize()'],
      correctAnswer: 0
    },
    {
      id: 9,
      question: 'Which library is built on top of Matplotlib and provides more aesthetically pleasing visualizations?',
      options: ['NumPy', 'Pandas', 'Seaborn', 'Scikit-learn'],
      correctAnswer: 2
    },
    
    // 数据处理
    {
      id: 10,
      question: 'Which method is used to handle missing values in pandas?',
      options: ['drop_na()', 'fill_na()', 'handle_missing()', 'clean_data()'],
      correctAnswer: 1
    }
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentExercise = exercises[currentExerciseIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      if (selectedAnswer === currentExercise.correctAnswer) {
        setScore(prev => prev + 1);
      }
      setCompletedExercises(prev => [...prev, currentExercise.id]);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentExerciseIndex(prev => (prev + 1) % exercises.length);
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
            语法练习
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            练习数据分析相关的语法规则和表达
          </p>
        </div>

        {/* 练习卡片 */}
        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-12">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                问题 {currentExerciseIndex + 1}/{exercises.length}
              </h3>
              <p className="text-lg text-gray-700">
                {currentExercise.question}
              </p>
            </div>

            <div className="space-y-4">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left px-6 py-3 rounded-md ${selectedAnswer === index ? 'border-2' : 'border'} ${selectedAnswer === index && showResult ? (index === currentExercise.correctAnswer ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-300 hover:bg-gray-50'}`}
                  disabled={showResult}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  提交答案
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-md ${selectedAnswer === currentExercise.correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedAnswer === currentExercise.correctAnswer ? '回答正确！' : `回答错误。正确答案是：${String.fromCharCode(65 + currentExercise.correctAnswer)}. ${currentExercise.options[currentExercise.correctAnswer]}`}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    下一题
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-500">得分</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {score}/{completedExercises.length}
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-500">已完成题目</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {completedExercises.length}
              </p>
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

export default Grammar;