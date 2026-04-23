import React, { useState, useEffect } from 'react';
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
                <div className="flex items-center justify-between mb-4">
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
