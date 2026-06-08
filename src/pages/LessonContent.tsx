import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../services/recommendationService';
import coursesWithContent from '../data/courses';
import CodeEditor from '../components/CodeEditor';
import CodeResult from '../components/CodeResult';
import CodeGradeResult from '../components/CodeGradeResult';
import { runCode } from '../services/codeRunService';
import { gradeCode } from '../services/codeGradeService';

const LessonContent: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [gradeError, setGradeError] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showQuickJump, setShowQuickJump] = useState(false);

  const course = courses.find(c => c.id === courseId);

  // 从coursesWithContent中获取课程内容
  const getCourseContent = (courseId: string) => {
    const course = coursesWithContent.find(c => c.id === courseId);
    if (!course) return defaultLessons;
    
    return {
      title: course.title,
      chapters: course.chapters.map(chapter => {
        // 生成章节的学习内容
        const contentLessons = [{
          title: `${chapter.title.split('：')[1] || chapter.title} - 学习内容`,
          content: `
# ${chapter.title}

## 学习内容
${chapter.content}

${chapter.examples.length > 0 ? `## 示例
${chapter.examples.map((example, i) => `
### 示例 ${i + 1}: ${example.title}
${example.content}

\`\`\`python
${example.code}
\`\`\`

**输出:** ${example.output}
`).join('')}` : ''}
          `
        }];
        
        // 生成章节的练习内容
        const exerciseLessons = chapter.exercises.map((exercise, index) => ({
          title: `${chapter.title.split('：')[1] || chapter.title} - 练习 ${index + 1}`,
          content: `
# ${exercise.title}

## 练习描述
${exercise.description}

## 示例代码
\`\`\`python
${exercise.codeTemplate}
\`\`\`

## 测试用例
${exercise.testCases.map((testCase, i) => `
### 测试用例 ${i + 1}
**输入:** ${testCase.input}
**预期输出:** ${testCase.expectedOutput}
`).join('')}

## 难度等级
${exercise.difficulty === 'easy' ? '简单' : exercise.difficulty === 'medium' ? '中等' : '困难'}
          `
        }));
        
        return {
          title: chapter.title,
          lessons: [...contentLessons, ...exerciseLessons]
        };
      })
    };
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

  const content = getCourseContent(courseId) || defaultLessons;
  const currentChapterData = content.chapters[currentChapter];
  const currentLessonData = currentChapterData?.lessons[currentLesson];

  const handleRunCode = async (code: string) => {
    setIsRunning(true);
    setOutput('');
    setError('');
    
    try {
      const result = await runCode(code);
      setOutput(result.output || '');
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setIsRunning(false);
    }
  };

  const handleGradeCode = async (code: string) => {
    setIsGrading(true);
    setScore(0);
    setFeedback([]);
    setCorrect(false);
    setGradeError('');
    
    // 根据当前课程和章节生成测试用例
    const testCases = generateTestCases(courseId, currentChapter, currentLesson);
    
    try {
      const result = await gradeCode(code, testCases);
      if (result.success) {
        setScore(result.score);
        setFeedback(result.feedback);
        setCorrect(result.correct);
      } else {
        setGradeError(result.error || '评分失败');
      }
    } catch (err) {
      setGradeError('Error connecting to server');
    } finally {
      setIsGrading(false);
    }
  };

  // 生成测试用例
  const generateTestCases = (courseId: string, chapterIndex: number, lessonIndex: number): Array<{ input: string; expectedOutput: string }> => {
    // 从coursesWithContent中获取测试用例
    const course = coursesWithContent.find(c => c.id === courseId);
    if (!course || !course.chapters[chapterIndex]) {
      // 默认测试用例
      return [
        {
          input: '',
          expectedOutput: 'Hello, World!'
        }
      ];
    }
    
    // 减去1是因为第一个lesson是学习内容，不是练习
    const exerciseIndex = lessonIndex - 1;
    if (exerciseIndex < 0 || !course.chapters[chapterIndex].exercises[exerciseIndex]) {
      // 默认测试用例
      return [
        {
          input: '',
          expectedOutput: 'Hello, World!'
        }
      ];
    }
    
    const exercise = course.chapters[chapterIndex].exercises[exerciseIndex];
    return exercise.testCases;
  };

  const goToPrevLesson = useCallback(() => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentChapter > 0) {
      const prevChapter = content.chapters[currentChapter - 1];
      setCurrentChapter(currentChapter - 1);
      setCurrentLesson(prevChapter.lessons.length - 1);
    }
  }, [currentChapter, currentLesson, content.chapters]);

  const goToNextLesson = useCallback(() => {
    const currentChapterLessons = currentChapterData?.lessons.length || 0;
    if (currentLesson < currentChapterLessons - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentChapter < content.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(0);
    }
  }, [currentChapter, currentLesson, currentChapterData, content.chapters]);

  const isFirstLesson = currentChapter === 0 && currentLesson === 0;
  const isLastLesson = currentChapter === content.chapters.length - 1 && currentLesson === (currentChapterData?.lessons.length || 0) - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevLesson();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNextLesson();
        } else if (e.key === 'j') {
          e.preventDefault();
          setShowQuickJump(prev => !prev);
        } else if (e.key === 'b') {
          e.preventDefault();
          setSidebarCollapsed(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevLesson, goToNextLesson]);

  const getBreadcrumbs = () => {
    return [
      { label: '课程中心', path: '/courses' },
      { label: content.title, path: `/courses/${courseId}` },
      { label: currentChapterData?.title?.split('：')[0] || '章节', path: null },
      { label: currentLessonData?.title || '课程', path: null }
    ];
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
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(prev => !prev)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="切换侧边栏 (Alt+B)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                </svg>
              </button>
              <button
                onClick={() => setShowQuickJump(prev => !prev)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="快速跳转 (Alt+J)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a href="/profile" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">查看个人资料</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 面包屑导航 */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              首页
            </Link>
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {getBreadcrumbs().map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.path ? (
                  <Link to={crumb.path} className="text-gray-500 hover:text-gray-700 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={index === getBreadcrumbs().length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                    {crumb.label}
                  </span>
                )}
                {index < getBreadcrumbs().length - 1 && (
                  <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          {!sidebarCollapsed && (
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg overflow-hidden sticky top-4">
                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">
                      {content.title}
                    </h3>
                    <button
                      onClick={() => setSidebarCollapsed(true)}
                      className="text-white hover:text-blue-200 transition-colors"
                      title="收起侧边栏"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-blue-100">
                    第 {currentChapter + 1} 章 / 共 {content.chapters.length} 章
                  </div>
                </div>
                <div className="border-t border-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <nav className="px-4 py-4">
                    {content.chapters.map((chapter, chapterIndex) => (
                      <div key={chapterIndex} className="mb-4">
                        <div className={`flex items-center px-3 py-2 rounded-md text-sm font-medium mb-2 ${
                          currentChapter === chapterIndex ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-600' : 'text-gray-900'
                        }`}>
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {chapter.title.split('：')[0] || chapter.title}
                        </div>
                        <ul className="space-y-1 ml-4">
                          {chapter.lessons.map((lesson, lessonIndex) => {
                            const isContentLesson = lessonIndex === 0;
                            const isCurrent = currentChapter === chapterIndex && currentLesson === lessonIndex;
                            return (
                              <li key={lessonIndex}>
                                <button
                                  onClick={() => {
                                    setCurrentChapter(chapterIndex);
                                    setCurrentLesson(lessonIndex);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all flex items-center ${
                                    isCurrent
                                      ? 'bg-blue-100 text-blue-800 font-medium shadow-sm'
                                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                  }`}
                                >
                                  <svg className={`h-4 w-4 mr-2 ${isCurrent ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isContentLesson ? (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    ) : (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    )}
                                  </svg>
                                  <span className="truncate">{lesson.title}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg overflow-hidden sticky top-4">
                <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                  <button
                    onClick={() => setSidebarCollapsed(false)}
                    className="w-full text-white hover:text-blue-200 transition-colors flex items-center justify-center"
                    title="展开侧边栏"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">展开目录</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {showQuickJump && (
              <div className="bg-white shadow rounded-lg overflow-hidden mb-6 border-2 border-blue-500">
                <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-blue-900">快速跳转</h3>
                    <button
                      onClick={() => setShowQuickJump(false)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">使用 Alt+J 快捷键打开/关闭</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {content.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="border-b border-gray-200 last:border-b-0">
                      <div className="px-4 py-3 bg-gray-50">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                          <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {chapter.title}
                        </h4>
                      </div>
                      <div className="py-2">
                        {chapter.lessons.map((lesson, lessonIndex) => {
                          const isCurrent = currentChapter === chapterIndex && currentLesson === lessonIndex;
                          return (
                            <button
                              key={lessonIndex}
                              onClick={() => {
                                setCurrentChapter(chapterIndex);
                                setCurrentLesson(lessonIndex);
                                setShowQuickJump(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                isCurrent
                                  ? 'bg-blue-100 text-blue-800 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className={`inline-block w-2 h-2 rounded-full mr-3 ${
                                  isCurrent ? 'bg-blue-600' : 'bg-gray-300'
                                }`}></span>
                                {lesson.title}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentLessonData?.title}
                    </h2>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        第 {currentChapter + 1} 章
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        第 {currentLesson + 1} 节
                      </span>
                      <Link
                        to={`/courses/${courseId}`}
                        className="text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        返回课程详情 →
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowQuickJump(true)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center shadow-sm"
                    title="快速跳转 (Alt+J)"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    快速跳转
                  </button>
                </div>
                {/* 学习进度指示器 */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>学习进度</span>
                    <span>{currentChapter + 1}/{content.chapters.length} 章</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${((currentChapter + 1) / content.chapters.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-6 sm:px-6">
                <div className="prose max-w-none">
                  {currentLessonData?.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return (
                        <div key={index} className="mb-8 mt-10">
                          <h1 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">{line.slice(2)}</h1>
                        </div>
                      );
                    } else if (line.startsWith('## ')) {
                      return (
                        <div key={index} className="mb-6 mt-8">
                          <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="inline-block w-2 h-6 bg-blue-500 mr-3"></span>
                            {line.slice(3)}
                          </h2>
                        </div>
                      );
                    } else if (line.trim().startsWith('```')) {
                      return null;
                    } else if (line.trim()) {
                      return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{line}</p>;
                    }
                    return null;
                  })}
                </div>

                {/* 代码编辑器 */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">代码练习</h3>
                  <div className="flex space-x-2 mb-4">
                    <CodeEditor 
                      defaultValue="" 
                      onRun={handleRunCode} 
                      onChange={setCode}
                      showRunButton={true} 
                    />
                  </div>
                  <div className="flex space-x-2 mb-4">
                    <button
                      onClick={() => handleGradeCode(code)}
                      disabled={isGrading}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        isGrading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {isGrading ? '评分中...' : '提交评分'}
                    </button>
                  </div>
                  <div className="mt-4">
                    <CodeResult output={output} error={error} />
                  </div>
                  <div className="mt-4">
                    {score > 0 && (
                      <CodeGradeResult 
                        score={score} 
                        feedback={feedback} 
                        correct={correct} 
                        error={gradeError} 
                      />
                    )}
                  </div>
                </div>

                {/* 导航按钮 */}
                <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={goToPrevLesson}
                      disabled={isFirstLesson}
                      className={`group px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center ${
                        isFirstLesson
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'
                      }`}
                    >
                      <svg className={`h-5 w-5 mr-2 transition-colors ${
                        isFirstLesson ? 'text-gray-300' : 'text-gray-400 group-hover:text-blue-500'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      上一节
                      <span className="ml-2 text-xs text-gray-400 group-hover:text-blue-400">
                        Alt+←
                      </span>
                    </button>
                    <button
                      onClick={goToNextLesson}
                      disabled={isLastLesson}
                      className={`group px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center ${
                        isLastLesson
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                      }`}
                    >
                      下一节
                      <span className="mr-2 text-xs opacity-75 group-hover:opacity-100">
                        Alt+→
                      </span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{currentChapter + 1}</span>
                    <span className="mx-1">.</span>
                    <span className="font-medium text-gray-700">{currentLesson + 1}</span>
                    <span className="mx-2">/</span>
                    <span>{content.chapters.length}</span>
                    <span className="mx-1">.</span>
                    <span>{currentChapterData?.lessons.length || 0}</span>
                  </div>
                </div>

                {/* 键盘快捷键提示 */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">键盘快捷键：</span>
                    <div className="ml-4 flex items-center space-x-4">
                      <span><kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">Alt</kbd> + <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">←</kbd> 上一节</span>
                      <span><kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">Alt</kbd> + <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">→</kbd> 下一节</span>
                      <span><kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">Alt</kbd> + <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">J</kbd> 快速跳转</span>
                      <span><kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">Alt</kbd> + <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold">B</kbd> 切换侧边栏</span>
                    </div>
                  </div>
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
