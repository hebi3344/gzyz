import {
  ValidationError,
  ServerError,
  NetworkError,
} from '../lib/errors';

export interface GradeCodeResult {
  success: boolean;
  score: number;
  feedback: string[];
  correct: boolean;
  error?: string;
  errorDetails?: {
    type: string;
    suggestions?: string[];
  };
}

export const gradeCode = async (
  code: string,
  testCases: Array<{ input: string; expectedOutput: string }>,
  signal?: AbortSignal
): Promise<GradeCodeResult> => {
  try {
    if (!code || code.trim().length === 0) {
      throw new ValidationError('代码不能为空', 'code');
    }

    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      throw new ValidationError('测试用例不能为空', 'testCases');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('/api/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, testCases }),
      signal: signal || controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json().catch(() => ({}));
        throw new ValidationError(
          data.message || '请求格式错误',
          'request',
          '提交的数据格式不正确',
          '请检查代码和测试用例格式'
        );
      }

      if (response.status >= 500) {
        throw new ServerError(
          response.status,
          '评分服务暂时不可用',
          '代码评分服务遇到了问题',
          '请稍后重试'
        );
      }

      throw new ServerError(
        response.status,
        `评分请求失败 (${response.status})`
      );
    }

    const data = await response.json();

    return {
      success: data.success ?? false,
      score: data.score ?? 0,
      feedback: data.feedback ?? [],
      correct: data.correct ?? false,
      error: data.error,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        success: false,
        score: 0,
        feedback: [error.userMessage || error.message],
        correct: false,
        error: error.userMessage,
        errorDetails: {
          type: 'ValidationError',
          suggestions: error.suggestion ? [error.suggestion] : undefined,
        },
      };
    }

    if (error instanceof ServerError) {
      return {
        success: false,
        score: 0,
        feedback: [],
        correct: false,
        error: error.userMessage,
        errorDetails: {
          type: 'ServerError',
          suggestions: error.suggestion ? [error.suggestion] : undefined,
        },
      };
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        score: 0,
        feedback: [],
        correct: false,
        error: '评分超时，请稍后重试',
        errorDetails: {
          type: 'Timeout',
          suggestions: ['代码可能太复杂或服务器响应慢'],
        },
      };
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new NetworkError();
      return {
        success: false,
        score: 0,
        feedback: [],
        correct: false,
        error: networkError.userMessage,
        errorDetails: {
          type: 'NetworkError',
          suggestions: [networkError.suggestion || '请检查网络连接'],
        },
      };
    }

    console.error('Error grading code:', error);
    return {
      success: false,
      score: 0,
      feedback: [],
      correct: false,
      error: error instanceof Error ? error.message : '评分时发生未知错误',
      errorDetails: {
        type: 'Unknown',
      },
    };
  }
};