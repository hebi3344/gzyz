import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import CodeResult from '../components/CodeResult';
import { runCode } from '../services/codeRunService';

const CodeEditorPage: React.FC = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async (code: string) => {
    setIsRunning(true);
    setOutput('');
    setError('');

    const result = await runCode(code);
    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);
  };

  const sampleCode = `# 示例1: 基本输出
print("Hello, Data Analysis!")

# 示例2: 简单计算
x = 10
y = 20
print(f"x + y = {x + y}")

# 示例3: 列表操作
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"平方数: {squared}")

# 示例4: 数据分析库使用
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(f"数组: {arr}")
print(f"均值: {np.mean(arr)}")
print(f"标准差: {np.std(arr)}")`;

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
                <a href="/learning" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  学习中心
                </a>
                <a href="/code-editor" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  代码编辑器
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">代码编辑器</h2>
          <p className="mt-2 text-gray-600">
            在这里编写和运行Python代码，测试你的数据分析技能。
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <CodeEditor
            defaultValue={sampleCode}
            onRun={handleRunCode}
            height="500px"
          />
          <CodeResult
            output={output}
            error={error}
            isRunning={isRunning}
          />
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">使用说明</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>在代码编辑器中编写Python代码</li>
            <li>点击「运行」按钮执行代码</li>
            <li>在「运行结果」区域查看执行结果</li>
            <li>支持使用numpy、pandas等数据分析库</li>
            <li>代码执行有10秒的时间限制</li>
          </ul>
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
                <li><a href="/code-editor" className="text-gray-300 hover:text-white text-sm">代码编辑器</a></li>
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

export default CodeEditorPage;