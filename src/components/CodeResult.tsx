import React from 'react';

interface CodeResultProps {
  output?: string;
  error?: string;
  isRunning?: boolean;
}

const CodeResult: React.FC<CodeResultProps> = ({ output = '', error = '', isRunning = false }) => {
  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">运行结果</h3>
      <div className="border border-gray-300 rounded-md bg-gray-50 p-4 min-h-[200px]">
        {isRunning ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">正在执行...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 font-mono text-sm whitespace-pre-wrap">
            {error}
          </div>
        ) : output ? (
          <div className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
            {output}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8">
            运行代码查看结果
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeResult;