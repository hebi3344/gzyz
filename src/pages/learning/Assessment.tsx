import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Assessment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // 测试数据
  const assessments = {
    '1': {
      title: '数据分析基础 - 第一章测试',
      questions: [
        {
          id: 1,
          question: '数据分析的主要目的是什么？',
          options: [
            '收集数据',
            '存储数据',
            '发现有用信息并支持决策',
            '可视化数据'
          ],
          correctAnswer: 2
        },
        {
          id: 2,
          question: '数据分析的流程不包括以下哪项？',
          options: [
            '数据收集',
            '数据清洗',
            '数据存储',
            '结果解释'
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: '以下哪项不是数据分析的重要性？',
          options: [
            '帮助企业做出更好的决策',
            '发现潜在的业务机会',
            '增加数据存储成本',
            '提高效率和降低成本'
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: '数据清洗的目的是什么？',
          options: [
            '删除所有数据',
            '处理缺失值、异常值和重复数据',
            '增加数据量',
            '加密数据'
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: '数据可视化的作用是什么？',
          options: [
            '使数据更难理解',
            '帮助人们理解复杂数据',
            '增加数据存储需求',
            '减慢决策过程'
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: '以下哪种不是常见的数据收集方法？',
          options: [
            '问卷调查',
            '网络爬虫',
            '数据可视化',
            'API调用'
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: '数据分析结果应该如何应用？',
          options: [
            '存储起来不使用',
            '用于业务决策',
            '仅用于报告',
            '忽略'
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: '数据探索阶段通常使用什么工具？',
          options: [
            '文本编辑器',
            '统计方法和可视化工具',
            '数据库管理系统',
            '操作系统'
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: '以下哪项是数据分析的核心概念？',
          options: [
            '数据存储',
            '数据传输',
            '数据清洗和转换',
            '数据加密'
          ],
          correctAnswer: 2
        },
        {
          id: 10,
          question: '数据分析对企业的价值是什么？',
          options: [
            '增加运营成本',
            '提供竞争优势',
            '使决策过程更慢',
            '减少数据可用性'
          ],
          correctAnswer: 1
        }
      ]
    },
    '2': {
      title: '商务数据可视化 - 第二章测试',
      questions: [
        {
          id: 1,
          question: '数据可视化的主要目的是什么？',
          options: [
            '使数据更复杂',
            '帮助理解数据和发现模式',
            '增加数据存储需求',
            '减慢决策过程'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: '以下哪种图表最适合显示随时间变化的趋势？',
          options: [
            '饼图',
            '条形图',
            '折线图',
            '散点图'
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: '以下哪种图表最适合比较不同类别的数据？',
          options: [
            '折线图',
            '条形图',
            '散点图',
            '热力图'
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: '数据可视化的原则不包括以下哪项？',
          options: [
            '简洁明了',
            '突出重点',
            '使用过多颜色',
            '考虑目标受众'
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: 'Python中用于数据可视化的库不包括以下哪项？',
          options: [
            'Matplotlib',
            'Seaborn',
            'Pandas',
            'NumPy'
          ],
          correctAnswer: 3
        },
        {
          id: 6,
          question: '以下哪种图表最适合显示部分与整体的关系？',
          options: [
            '条形图',
            '饼图',
            '折线图',
            '散点图'
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          question: '数据可视化中的颜色选择应该考虑什么？',
          options: [
            '使用尽可能多的颜色',
            '考虑色盲友好性',
            '使用对比度低的颜色',
            '忽略颜色含义'
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: '以下哪种工具不是常用的数据可视化工具？',
          options: [
            'Excel',
            'Tableau',
            'Power BI',
            'MySQL'
          ],
          correctAnswer: 3
        },
        {
          id: 9,
          question: '数据可视化中的标签应该如何处理？',
          options: [
            '不使用标签',
            '使用清晰简洁的标签',
            '使用过长的标签',
            '使用模糊的标签'
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          question: '以下哪种图表最适合显示两个变量之间的关系？',
          options: [
            '饼图',
            '散点图',
            '条形图',
            '热力图'
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          question: '数据可视化的最佳实践不包括以下哪项？',
          options: [
            '保持简洁',
            '突出重点',
            '使用3D效果增强视觉效果',
            '考虑目标受众'
          ],
          correctAnswer: 2
        },
        {
          id: 12,
          question: 'Python中创建简单图表的基本步骤不包括以下哪项？',
          options: [
            '导入可视化库',
            '准备数据',
            '创建图表',
            '加密数据'
          ],
          correctAnswer: 3
        },
        {
          id: 13,
          question: '以下哪种图表最适合显示分布情况？',
          options: [
            '直方图',
            '饼图',
            '折线图',
            '条形图'
          ],
          correctAnswer: 0
        },
        {
          id: 14,
          question: '数据可视化中的标题应该如何处理？',
          options: [
            '不使用标题',
            '使用清晰描述性的标题',
            '使用过长的标题',
            '使用模糊的标题'
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          question: '以下哪种不是数据可视化的类型？',
          options: [
            '静态可视化',
            '交互式可视化',
            '3D可视化',
            '数据加密'
          ],
          correctAnswer: 3
        }
      ]
    }
  };

  const assessment = assessments[id as keyof typeof assessments];

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">测试不存在</h1>
          <p className="text-lg text-gray-500 mb-6">抱歉，您访问的测试不存在或已被删除</p>
          <Link
            to="/learning"
            className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            返回学习中心
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (selectedAnswers[currentQuestion] !== undefined) {
      if (currentQuestion < assessment.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 计算得分
        let correctCount = 0;
        selectedAnswers.forEach((answer, index) => {
          if (answer === assessment.questions[index].correctAnswer) {
            correctCount++;
          }
        });
        setScore(correctCount);
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQuestionData = assessment.questions[currentQuestion];

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
            {assessment.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {showResults ? '测试结果' : `问题 ${currentQuestion + 1}/${assessment.questions.length}`}
          </p>
        </div>

        {showResults ? (
          // 显示结果
          <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
                  <span className="text-4xl font-bold text-green-600">{score}/{assessment.questions.length}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {score >= assessment.questions.length * 0.6 ? '恭喜您通过测试！' : '很遗憾，您未通过测试'}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {score >= assessment.questions.length * 0.6 
                  ? '您已经掌握了本章节的核心内容，可以继续学习下一章节。' 
                  : '建议您重新学习本章节的内容，然后再次参加测试。'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/learning"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  返回学习中心
                </Link>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                    setShowResults(false);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  重新测试
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 显示问题
          <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-12">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentQuestionData.question}
                </h3>
                <div className="space-y-4">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left px-6 py-3 rounded-md ${selectedAnswers[currentQuestion] === index ? 'border-2' : 'border'} ${selectedAnswers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一题
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="px-6 py-3 border border-transparent text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === assessment.questions.length - 1 ? '提交答案' : '下一题'}
                </button>
              </div>
            </div>
          </div>
        )}
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

export default Assessment;
