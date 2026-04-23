import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Exercise, Submission } from '../types';

interface ExerciseEditorProps {
  exercise: Exercise;
  onClose: () => void;
}

const ExerciseEditor: React.FC<ExerciseEditorProps> = ({ exercise, onClose }) => {
  const [code, setCode] = useState(exercise.codeTemplate);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // 模拟代码执行和评分
    setTimeout(() => {
      // 简单的评分逻辑：检查代码是否包含关键部分
      const score = calculateScore(code, exercise.testCases);
      
      const newSubmission: Submission = {
        id: `sub-${Date.now()}`,
        exerciseId: exercise.id,
        code,
        status: score === 100 ? 'success' : 'error',
        errorMessage: score === 100 ? undefined : '部分测试用例未通过',
        score,
        timestamp: Date.now()
      };
      
      setSubmission(newSubmission);
      setIsSubmitting(false);
    }, 1000);
  };

  const calculateScore = (code: string, testCases: any[]): number => {
    // 简单的评分逻辑，实际项目中可以使用更复杂的方法
    // 这里只是模拟，根据代码是否包含关键部分来评分
    let score = 0;
    
    // 检查代码是否包含必要的部分
    if (code.includes('def')) score += 20;
    if (code.includes('return')) score += 20;
    if (code.includes('print')) score += 20;
    
    // 检查是否处理了测试用例
    score += testCases.length * 20;
    
    return Math.min(score, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{exercise.title}</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{exercise.description}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">代码编辑器</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 p-4 border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请编写代码..."
              />
            </div>
            
            <div className="mb-4">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? '提交中...' : '提交代码'}
              </Button>
            </div>
            
            {submission && (
              <div className={`mt-4 p-4 rounded-md ${
                submission.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <h3 className="font-medium mb-2">提交结果</h3>
                <p>得分: {submission.score}/100</p>
                {submission.errorMessage && (
                  <p className="mt-2">错误信息: {submission.errorMessage}</p>
                )}
                {submission.status === 'success' && (
                  <p className="mt-2 text-green-700">恭喜！您的代码通过了所有测试用例。</p>
                )}
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">测试用例</h3>
              {exercise.testCases.map((testCase, index) => (
                <div key={index} className="mb-2 p-2 bg-muted rounded-md">
                  <p className="text-xs font-medium">输入 {index + 1}:</p>
                  <p className="text-xs">{testCase.input}</p>
                  <p className="text-xs font-medium mt-1">预期输出 {index + 1}:</p>
                  <p className="text-xs">{testCase.expectedOutput}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExerciseEditor;