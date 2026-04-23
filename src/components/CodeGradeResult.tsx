import React from 'react';

interface CodeGradeResultProps {
  score: number;
  feedback: string[];
  correct: boolean;
  error?: string;
}

const CodeGradeResult: React.FC<CodeGradeResultProps> = ({ score, feedback, correct, error }) => {
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <h4 className="text-red-600 font-medium mb-2">评分失败</h4>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className={`p-4 ${correct ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'} rounded-md`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className={`font-medium ${correct ? 'text-green-600' : 'text-yellow-600'}`}>
            {correct ? '代码正确！' : '代码需要改进'}
          </h4>
          <div className={`text-xl font-bold ${score >= 90 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {score}分
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">反馈：</h5>
          <ul className="space-y-2">
            {feedback.map((item, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeGradeResult;