import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../services/recommendationService';

const LessonContent: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  const course = courses.find(c => c.id === courseId);

  const courseLessons = {
    '1': {
      title: '数据分析基础',
      chapters: [
        {
          title: '第一章：数据分析概述',
          lessons: [
            {
              title: '1.1 数据分析的定义和重要性',
              content: `
# 数据分析的定义和重要性

## 什么是数据分析

数据分析是指用适当的统计分析方法对收集来的大量数据进行分析，提取有用信息和形成结论而对数据加以详细研究和概括总结的过程。

## 数据分析的重要性

1. 帮助企业做出更好的决策
2. 发现潜在的业务机会
3. 优化业务流程
4. 提高效率和降低成本
5. 预测未来趋势
            `
            },
            {
              title: '1.2 数据分析的流程',
              content: `
# 数据分析的流程

## 数据分析通常包括以下步骤：

1. **数据收集**：确定数据源并收集相关数据
2. **数据清洗**：处理缺失值、异常值和重复数据
3. **数据探索**：使用统计方法和可视化工具探索数据
4. **数据分析**：应用适当的分析方法
5. **结果解释**：解释分析结果
6. **决策支持**：将结果应用于业务决策
            `
            }
          ]
        },
        {
          title: '第二章：数据收集与清洗',
          lessons: [
            {
              title: '2.1 数据收集的方法',
              content: `
# 数据收集的方法

## 常见的数据收集方法

1. **问卷调查**：通过问卷收集数据
2. **网络爬虫**：从网页收集数据
3. **数据库查询**：从数据库提取数据
4. **API调用**：通过API获取数据
5. **日志分析**：分析系统日志
            `
            }
          ]
        }
      ]
    },
    '7': {
      title: 'Python编程基础',
      chapters: [
        {
          title: '第一章：Python入门',
          lessons: [
            {
              title: '1.1 Python简介',
              content: `
# Python简介

## 什么是Python

Python是一种高级编程语言，具有简单易读的语法，广泛应用于数据分析、人工智能、Web开发等领域。

## Python的特点

1. 简单易学
2. 丰富的库和框架
3. 强大的数据处理能力
4. 活跃的社区
            `
            },
            {
              title: '1.2 Python基础语法',
              content: `
# Python基础语法

## 变量和数据类型

\`\`\`python
# 定义变量
name = "数据分析"
age = 25
is_student = True

# 数据类型
# 字符串、整数、浮点数、布尔值
\`\`\`

## 控制流

\`\`\`python
# if语句
if age > 18:
    print("成年")
else:
    print("未成年")

# for循环
for i in range(5):
    print(i)
\`\`\`
            `
            }
          ]
        }
      ]
    }
  };

  const defaultLessons = {
    title: course?.title || '课程内容',
    chapters: [
      {
        title: '第一章：课程介绍',
        lessons: [
          {
            title: '1.1 课程概述',
            content: `
# ${course?.title || '课程概述'}

欢迎学习本课程！

## 课程目标

通过本课程的学习，您将掌握：
- 相关的理论知识
- 实用的操作技能
- 解决实际问题的能力

## 学习建议

1. 认真阅读每节课的内容
2. 完成相关的练习
3. 多动手实践
4. 遇到问题及时查阅资料
            `
          }
        ]
      }
    ]
  };

  const content = courseLessons[courseId as keyof typeof courseLessons] || defaultLessons;
  const currentChapterData = content.chapters[currentChapter];
  const currentLessonData = currentChapterData?.lessons[currentLesson];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-blue-600">
                <h3 className="text-lg font-medium text-white">
                  {content.title}
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <nav className="px-4 py-4">
                  {content.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        {chapter.title}
                      </h4>
                      <ul className="space-y-1">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex}>
                            <button
                              onClick={() => {
                                setCurrentChapter(chapterIndex);
                                setCurrentLesson(lessonIndex);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                                currentChapter === chapterIndex && currentLesson === lessonIndex
                                  ? 'bg-blue-100 text-blue-800 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {lesson.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentLessonData?.title}
                  </h2>
                  <Link
                    to={`/courses/${courseId}`}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    返回课程详情
                  </Link>
                </div>
              </div>
              <div className="px-4 py-6 sm:px-6">
                <div className="prose max-w-none">
                  {currentLessonData?.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">{line.slice(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-4 mt-6">{line.slice(3)}</h2>;
                    } else if (line.trim().startsWith('```')) {
                      return null;
                    } else if (line.trim()) {
                      return <p key={index} className="text-gray-700 mb-4">{line}</p>;
                    }
                    return null;
                  })}
                </div>

                {/* 导航按钮 */}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (currentLesson > 0) {
                        setCurrentLesson(currentLesson - 1);
                      } else if (currentChapter > 0) {
                        const prevChapter = content.chapters[currentChapter - 1];
                        setCurrentChapter(currentChapter - 1);
                        setCurrentLesson(prevChapter.lessons.length - 1);
                      }
                    }}
                    disabled={currentChapter === 0 && currentLesson === 0}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    上一节
                  </button>
                  <button
                    onClick={() => {
                      const currentChapterLessons = currentChapterData?.lessons.length || 0;
                      if (currentLesson < currentChapterLessons - 1) {
                        setCurrentLesson(currentLesson + 1);
                      } else if (currentChapter < content.chapters.length - 1) {
                        setCurrentChapter(currentChapter + 1);
                        setCurrentLesson(0);
                      }
                    }}
                    disabled={
                      currentChapter === content.chapters.length - 1 &&
                      currentLesson === (currentChapterData?.lessons.length || 0) - 1
                    }
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    下一节
                  </button>
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

export default LessonContent;
