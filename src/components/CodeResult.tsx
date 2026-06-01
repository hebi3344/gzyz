import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface CodeResultProps {
  output?: string;
  error?: string;
  isRunning?: boolean;
  errorDetails?: {
    type: string;
    line?: number;
    column?: number;
  };
  onRetry?: () => void;
}

const CodeResult: React.FC<CodeResultProps> = ({
  output = '',
  error = '',
  isRunning = false,
  errorDetails,
  onRetry
}) => {
  const getErrorTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      SyntaxError: '语法错误',
      NameError: '变量错误',
      TypeError: '类型错误',
      ImportError: '导入错误',
      RuntimeError: '运行时错误',
      Timeout: '超时错误',
    };
    return labels[type] || type;
  };

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-700">运行结果</h3>
        {error && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            重试
          </button>
        )}
      </div>
      <div className="border border-gray-300 rounded-md bg-gray-50 p-4 min-h-[200px]">
        {isRunning ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">正在执行...</span>
          </div>
        ) : error ? (
          <div>
            <div className="flex items-start text-red-600 font-mono text-sm">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <pre className="whitespace-pre-wrap">{error}</pre>
                {errorDetails && (
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-red-100 rounded">
                        {getErrorTypeLabel(errorDetails.type)}
                      </span>
                      {errorDetails.line && (
                        <span className="px-2 py-1 bg-red-100 rounded">
                          行 {errorDetails.line}
                        </span>
                      )}
                      {errorDetails.column && (
                        <span className="px-2 py-1 bg-red-100 rounded">
                          列 {errorDetails.column}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
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