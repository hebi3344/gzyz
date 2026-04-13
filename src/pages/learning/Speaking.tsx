import React, { useState } from 'react';

const Speaking: React.FC = () => {
  // 模拟口语练习数据
  const speakingExercises = [
    // 基础术语
    { id: 1, phrase: 'data analysis', tip: '注意 "data" 的发音，重音在第一个音节' },
    { id: 2, phrase: 'machine learning', tip: '"machine" 和 "learning" 之间有连读' },
    { id: 3, phrase: 'business intelligence', tip: '注意 "intelligence" 的重音位置' },
    { id: 4, phrase: 'statistical analysis', tip: '"statistical" 有四个音节，注意发音节奏' },
    { id: 5, phrase: 'data visualization', tip: '"visualization" 是长单词，注意每个音节的发音' },
    
    // Python相关术语
    { id: 6, phrase: 'Python programming', tip: '"Python" 的发音重音在第一个音节' },
    { id: 7, phrase: 'NumPy array', tip: '"NumPy" 发音为 /ˈnʌmpaɪ/' },
    { id: 8, phrase: 'Pandas DataFrame', tip: '"Pandas" 发音为 /ˈpændəs/' },
    { id: 9, phrase: 'Matplotlib plot', tip: '"Matplotlib" 发音为 /mætˈplɒtlib/' },
    { id: 10, phrase: 'Seaborn visualization', tip: '"Seaborn" 发音为 /ˈsiːbɔːrn/' },
    { id: 11, phrase: 'data cleaning', tip: '注意 "cleaning" 的发音' },
    { id: 12, phrase: 'data transformation', tip: '注意 "transformation" 的重音位置' },
    { id: 13, phrase: 'time series analysis', tip: '注意短语间的连读' },
    { id: 14, phrase: 'machine learning model', tip: '注意 "learning" 和 "model" 之间的连读' },
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentExercise = speakingExercises[currentExerciseIndex];

  const handleStartRecording = () => {
    setIsRecording(true);
    // 模拟录音过程
    setTimeout(() => {
      setIsRecording(false);
      setShowFeedback(true);
      setFeedback('发音清晰，重音正确，连读自然');
    }, 3000);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setFeedback('');
    setCompletedExercises(prev => [...prev, currentExercise.id]);
    setCurrentExerciseIndex((prev) => (prev + 1) % speakingExercises.length);
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
            口语跟读
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            通过语音识别练习数据分析相关术语的发音
          </p>
        </div>

        {/* 口语练习卡片 */}
        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {currentExercise.phrase}
            </h3>
            <p className="text-gray-600 mb-8">
              {currentExercise.tip}
            </p>

            {!showFeedback ? (
              <div>
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className={`px-8 py-4 rounded-full ${isRecording ? 'bg-gray-400' : 'bg-purple-600'} text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  {isRecording ? (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                      录音中...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      开始录音
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-green-100 text-green-700 rounded-md">
                  {feedback}
                </div>
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-purple-600 text-white font-medium rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  下一个
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-500">已完成练习</h4>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {completedExercises.length}/{speakingExercises.length}
            </p>
          </div>
        </div>

        {/* 练习列表 */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            练习列表
          </h3>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    短语
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提示
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {speakingExercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exercise.phrase}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{exercise.tip}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${completedExercises.includes(exercise.id) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {completedExercises.includes(exercise.id) ? '已完成' : '未完成'}
                      </span>
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

export default Speaking;