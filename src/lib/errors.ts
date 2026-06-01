export interface AppError extends Error {
  code?: string;
  status?: number;
  retryable?: boolean;
  userMessage?: string;
  suggestion?: string;
}

export class NetworkError extends Error implements AppError {
  code = 'NETWORK_ERROR';
  retryable = true;
  
  constructor(message: string = '网络连接失败', public userMessage?: string, public suggestion?: string) {
    super(message);
    this.userMessage = userMessage || '请检查您的网络连接';
    this.suggestion = suggestion || '请确保您的设备已连接到互联网，然后重试';
  }
}

export class TimeoutError extends Error implements AppError {
  code = 'TIMEOUT_ERROR';
  retryable = true;
  
  constructor(message: string = '请求超时', public userMessage?: string, public suggestion?: string) {
    super(message);
    this.userMessage = userMessage || '请求花费的时间比预期长';
    this.suggestion = suggestion || '请稍后重试。如果问题持续存在，请刷新页面';
  }
}

export class ServerError extends Error implements AppError {
  code = 'SERVER_ERROR';
  status: number;
  retryable: boolean;
  
  constructor(status: number, message?: string, public userMessage?: string, public suggestion?: string) {
    super(message || `服务器错误 (${status})`);
    this.status = status;
    this.userMessage = userMessage || `服务器暂时无法处理您的请求 (${status})`;
    this.suggestion = suggestion || '请稍后重试。如果问题持续存在，请联系支持团队';
    this.retryable = status >= 500;
  }
}

export class ValidationError extends Error implements AppError {
  code = 'VALIDATION_ERROR';
  retryable = false;
  field?: string;
  
  constructor(message: string, field?: string, public userMessage?: string, public suggestion?: string) {
    super(message);
    this.field = field;
    this.userMessage = userMessage || message;
    this.suggestion = suggestion || '请检查输入并重试';
  }
}

export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError || (error as AppError)?.code === 'NETWORK_ERROR';
};

export const isTimeoutError = (error: unknown): error is TimeoutError => {
  return error instanceof TimeoutError || (error as AppError)?.code === 'TIMEOUT_ERROR';
};

export const isServerError = (error: unknown): error is ServerError => {
  return error instanceof ServerError || (error as AppError)?.code === 'SERVER_ERROR';
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError || (error as AppError)?.code === 'VALIDATION_ERROR';
};

export const isRetryable = (error: unknown): boolean => {
  if ((error as AppError)?.retryable !== undefined) {
    return (error as AppError).retryable!;
  }
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  if ((error as AppError)?.userMessage) {
    return (error as AppError).userMessage!;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return '发生了未知错误';
};

export const getErrorSuggestion = (error: unknown): string | undefined => {
  return (error as AppError)?.suggestion;
};
