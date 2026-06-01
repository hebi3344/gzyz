import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';

interface CodeGradeResultProps {
  score: number;
  feedback: string[];
  correct: boolean;
  error?: string;
  errorDetails?: {
    type: string;
    suggestions?: string[];
  };
  onRetry?: () => void;
}

const CodeGradeResult: React.FC<CodeGradeResultProps> = ({
  score,
  feedback,
  correct,
  error,
  errorDetails,
  onRetry
}) => {
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-red-600 font-semibold mb-2">评分失败</h4>
            <p className="text-red-700 mb-3">{error}</p>
            {errorDetails?.suggestions && errorDetails.suggestions.length > 0 && (
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-xs font-medium text-red-800 mb-2">建议：</p>
                <ul className="text-sm text-red-700 space-y-1">
                  {errorDetails.suggestions.map((suggestion, idx) => (
                    <li key={idx}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 flex items-center px-4 py-2 bg-white text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重新提交
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className={`p-6 ${correct ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'} rounded-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {correct ? (
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            ) : (
              <XCircle className="h-6 w-6 text-yellow-600 mr-2" />
            )}
            <h4 className={`font-semibold ${correct ? 'text-green-600' : 'text-yellow-600'}`}>
              {correct ? '代码正确！' : '代码需要改进'}
            </h4>
          </div>
          <div className={`text-2xl font-bold ${score >= 90 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {score}分
          </div>
        </div>

        {score < 100 && (
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-4 w-4 text-yellow-600 mr-2" />
              <h5 className="text-sm font-medium text-gray-700">改进建议：</h5>
            </div>
            <ul className="space-y-2">
              {feedback.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {correct && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">
              🎉 恭喜！您的代码通过了所有测试用例。继续挑战更难的题目吧！
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGradeResult;