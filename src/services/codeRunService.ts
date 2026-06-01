import {
  AppError,
  NetworkError,
  TimeoutError,
  ServerError,
  ValidationError,
} from '../lib/errors';

export interface RunCodeResult {
  success: boolean;
  output: string;
  error: string;
  errorDetails?: {
    type: string;
    line?: number;
    column?: number;
  };
}

export const runCode = async (code: string, signal?: AbortSignal): Promise<RunCodeResult> => {
  try {
    if (!code || code.trim().length === 0) {
      throw new ValidationError('代码不能为空');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
      signal: signal || controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json().catch(() => ({}));
        throw new ValidationError(
          data.message || '代码格式错误',
          'code',
          '请检查代码格式',
          '确保代码语法正确，不包含特殊字符'
        );
      }

      if (response.status >= 500) {
        throw new ServerError(
          response.status,
          '服务器执行错误',
          '代码执行服务暂时不可用',
          '请稍后重试'
        );
      }

      throw new ServerError(
        response.status,
        `请求失败 (${response.status})`
      );
    }

    const data = await response.json();

    if (data.error) {
      const errorInfo = parsePythonError(data.error);
      return {
        success: false,
        output: '',
        error: errorInfo.message,
        errorDetails: errorInfo.details,
      };
    }

    return {
      success: true,
      output: data.output || '',
      error: '',
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        success: false,
        output: '',
        error: error.userMessage || error.message,
      };
    }

    if (error instanceof ServerError) {
      return {
        success: false,
        output: '',
        error: error.userMessage || error.message,
      };
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        output: '',
        error: '代码执行超时',
      };
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new NetworkError();
      return {
        success: false,
        output: '',
        error: networkError.userMessage || '网络连接失败',
      };
    }

    console.error('Error running code:', error);
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : '执行代码时发生未知错误',
    };
  }
};

const parsePythonError = (errorMessage: string): { message: string; details?: RunCodeResult['errorDetails'] } => {
  const syntaxErrorMatch = errorMessage.match(/SyntaxError: (.+)/);
  if (syntaxErrorMatch) {
    return {
      message: `语法错误: ${syntaxErrorMatch[1]}`,
      details: { type: 'SyntaxError' },
    };
  }

  const nameErrorMatch = errorMessage.match(/NameError: name '(\w+)' is not defined/);
  if (nameErrorMatch) {
    return {
      message: `变量错误: '${nameErrorMatch[1]}' 未定义`,
      details: { type: 'NameError' },
    };
  }

  const typeErrorMatch = errorMessage.match(/TypeError: (.+)/);
  if (typeErrorMatch) {
    return {
      message: `类型错误: ${typeErrorMatch[1]}`,
      details: { type: 'TypeError' },
    };
  }

  const importErrorMatch = errorMessage.match(/ImportError: (.+)/);
  if (importErrorMatch) {
    return {
      message: `导入错误: ${importErrorMatch[1]}`,
      details: { type: 'ImportError' },
    };
  }

  const lineMatch = errorMessage.match(/line (\d+)/);
  const columnMatch = errorMessage.match(/column (\d+)/);

  return {
    message: errorMessage,
    details: {
      type: 'RuntimeError',
      line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
      column: columnMatch ? parseInt(columnMatch[1], 10) : undefined,
    },
  };
};