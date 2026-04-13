import React, { useState, useEffect } from 'react';

const Listening: React.FC = () => {
  // 模拟听力练习数据
  const listeningExercises = [
    {
      id: 1,
      title: '数据分析基础概念',
      audioUrl: 'https://example.com/audio1.mp3',
      transcript: 'Data analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information, inform conclusions, and support decision-making. It involves various techniques and methods to extract meaningful insights from data, which can help businesses make informed decisions.',
      questions: [
        {
          question: 'What is data analysis?',
          options: ['The process of collecting data', 'The process of inspecting, cleaning, transforming, and modeling data', 'The process of storing data', 'The process of visualizing data'],
          correctAnswer: 1
        },
        {
          question: 'What is the purpose of data analysis?',
          options: ['To collect data', 'To store data', 'To discover useful information and support decision-making', 'To visualize data'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Python数据分析介绍',
      audioUrl: 'https://example.com/audio2.mp3',
      transcript: 'Python is a popular programming language for data analysis. It offers powerful libraries like NumPy for numerical computing, Pandas for data manipulation, Matplotlib for data visualization, and Scikit-learn for machine learning. These tools make it easier to analyze and interpret complex data sets, and they are widely used in various industries.',
      questions: [
        {
          question: 'Which library is used for numerical computing in Python?',
          options: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
          correctAnswer: 1
        },
        {
          question: 'Which library is used for machine learning in Python?',
          options: ['NumPy', 'Matplotlib', 'Pandas', 'Scikit-learn'],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 3,
      title: 'Pandas数据处理',
      audioUrl: 'https://example.com/audio3.mp3',
      transcript: 'Pandas is a powerful library for data manipulation and analysis. It provides data structures like DataFrames and Series, which make it easy to work with structured data. With Pandas, you can clean data, transform it, perform various operations like grouping and aggregation, and handle missing values. It is one of the most widely used libraries for data analysis in Python.',
      questions: [
        {
          question: 'What data structures does Pandas provide?',
          options: ['Arrays and Lists', 'DataFrames and Series', 'Dictionaries and Tuples', 'Sets and Queues'],
          correctAnswer: 1
        },
        {
          question: 'What operations can you perform with Pandas?',
          options: ['Only data cleaning', 'Only data visualization', 'Data cleaning, transformation, and aggregation', 'Only data storage'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 4,
      title: '数据可视化的重要性',
      audioUrl: 'https://example.com/audio4.mp3',
      transcript: 'Data visualization is important because it helps people understand complex data more easily. It allows analysts to identify patterns, trends, and outliers that might not be apparent in raw data. Libraries like Matplotlib and Seaborn make it easy to create professional-looking visualizations in Python, which can effectively communicate insights to stakeholders.',
      questions: [
        {
          question: 'Why is data visualization important?',
          options: ['It makes data collection easier', 'It helps people understand complex data more easily', 'It stores data more efficiently', 'It processes data faster'],
          correctAnswer: 1
        },
        {
          question: 'Which libraries are used for data visualization in Python?',
          options: ['NumPy and Pandas', 'Matplotlib and Seaborn', 'Scikit-learn and TensorFlow', 'Requests and BeautifulSoup'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 5,
      title: '机器学习入门',
      audioUrl: 'https://example.com/audio5.mp3',
      transcript: 'Machine learning is a subset of artificial intelligence that allows computers to learn from data without being explicitly programmed. It involves algorithms that can identify patterns in data and make predictions or decisions based on those patterns. In data analysis, machine learning techniques are used to build predictive models, classify data, and discover hidden patterns.',
      questions: [
        {
          question: 'What is machine learning?',
          options: ['A subset of artificial intelligence that allows computers to learn from data', 'A programming language for data analysis', 'A data visualization technique', 'A database management system'],
          correctAnswer: 0
        },
        {
          question: 'What are machine learning techniques used for in data analysis?',
          options: ['Only data collection', 'Building predictive models and classifying data', 'Only data storage', 'Only data cleaning'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 6,
      title: '商务数据分析',
      audioUrl: 'https://example.com/audio6.mp3',
      transcript: 'Business analytics involves using data analysis techniques to help businesses make better decisions. It includes analyzing sales data, customer behavior, market trends, and financial performance. Business analysts use tools like Excel, Power BI, and Python to analyze data and create reports and dashboards that provide insights into business performance.',
      questions: [
        {
          question: 'What is business analytics?',
          options: ['Using data analysis techniques to help businesses make better decisions', 'A type of machine learning', 'A data visualization tool', 'A database management system'],
          correctAnswer: 0
        },
        {
          question: 'What tools do business analysts use?',
          options: ['Only Excel', 'Only Power BI', 'Excel, Power BI, and Python', 'Only Python'],
          correctAnswer: 2
        }
      ]
    }
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentExercise = listeningExercises[currentExerciseIndex];

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // 模拟音频播放
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === currentExercise.questions.length) {
      setShowResults(true);
      let correctCount = 0;
      selectedAnswers.forEach((answer, index) => {
        if (answer === currentExercise.questions[index].correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setCompletedExercises(prev => [...prev, currentExercise.id]);
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    setShowTranscript(false);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
    setCurrentExerciseIndex((prev) => (prev + 1) % listeningExercises.length);
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
            听力训练
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            提高数据分析相关内容的听力理解能力
          </p>
        </div>

        {/* 听力练习卡片 */}
        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {currentExercise.title}
            </h3>

            {/* 音频播放 */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className={`px-8 py-4 rounded-full ${isPlaying ? 'bg-gray-400' : 'bg-orange-600'} text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                {isPlaying ? (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    播放中...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    播放音频
                  </div>
                )}
              </button>
            </div>

            {/*  transcript */}
            <div className="mb-8">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                {showTranscript ? '隐藏原文' : '显示原文'}
              </button>
              {showTranscript && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-700">{currentExercise.transcript}</p>
                </div>
              )}
            </div>

            {/* 问题 */}
            <div className="space-y-6">
              {currentExercise.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border border-gray-200 rounded-md p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    {questionIndex + 1}. {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                        className={`w-full text-left px-4 py-2 rounded-md ${selectedAnswers[questionIndex] === optionIndex ? 'border-2' : 'border'} ${showResults ? (optionIndex === question.correctAnswer ? 'border-green-500 bg-green-50' : selectedAnswers[questionIndex] === optionIndex ? 'border-red-500 bg-red-50' : 'border-gray-300') : 'border-gray-300 hover:bg-gray-50'}`}
                        disabled={showResults}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 提交按钮 */}
            <div className="mt-8">
              {!showResults ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length !== currentExercise.questions.length}
                  className="w-full px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400"
                >
                  提交答案
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
                    得分: {score}/{currentExercise.questions.length}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    下一个
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-500">已完成练习</h4>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {completedExercises.length}/{listeningExercises.length}
            </p>
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

export default Listening;