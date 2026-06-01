import { useState, useCallback } from 'react';
import { useFeedback } from '../contexts/FeedbackContext';
import {
  AppError,
  NetworkError,
  TimeoutError,
  ServerError,
  ValidationError,
  getErrorMessage,
  getErrorSuggestion,
} from '../lib/errors';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AppError) => void;
  successMessage?: string;
  errorTitle?: string;
}

interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
  execute: (promise: Promise<T>, options?: UseAsyncOptions<T>) => Promise<T | null>;
  reset: () => void;
}

export const useAsync = <T,>(): UseAsyncReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const { showSuccess, showError } = useFeedback();

  const execute = useCallback(
    async (promise: Promise<T>, options: UseAsyncOptions<T> = {}): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await promise;
        setData(result);

        if (options.successMessage) {
          showSuccess(options.successMessage);
        }

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (err) {
        const appError = normalizeError(err);
        setError(appError);

        const errorTitle = options.errorTitle || '操作失败';
        const errorMessage = getErrorMessage(appError);
        const suggestion = getErrorSuggestion(appError);
        const fullMessage = suggestion ? `${errorMessage}。${suggestion}` : errorMessage;

        showError(errorTitle, fullMessage);

        if (options.onError) {
          options.onError(appError);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

export const normalizeError = (error: unknown): AppError => {
  if (error && typeof error === 'object' && 'code' in error) {
    const err = error as any;
    if (err.code === 'NETWORK_ERROR') return new NetworkError(err.message);
    if (err.code === 'TIMEOUT_ERROR') return new TimeoutError(err.message);
    if (err.code === 'SERVER_ERROR') return new ServerError(err.status || 500, err.message);
    if (err.code === 'VALIDATION_ERROR') return new ValidationError(err.message, err.field);
  }

  if (error instanceof Error && error.name === 'AppError') {
    return error as AppError;
  }

  if (error instanceof NetworkError) return error;
  if (error instanceof TimeoutError) return error;
  if (error instanceof ServerError) return error;
  if (error instanceof ValidationError) return error;

  if (error instanceof TypeError) {
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(error.message);
    }
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return new TimeoutError('请求被取消');
  }

  if ((error as any)?.response) {
    const response = (error as any).response;
    const status = response.status;

    if (status === 400) {
      return new ValidationError(
        response.data?.message || '请求参数无效',
        response.data?.field
      );
    }

    if (status === 401) {
      return new ServerError(401, '未授权', '请先登录', '请登录后重试');
    }

    if (status === 403) {
      return new ServerError(403, '禁止访问', '您没有权限执行此操作', '请联系管理员获取权限');
    }

    if (status === 404) {
      return new ServerError(404, '资源不存在', '请求的内容不存在', '请检查URL或刷新页面');
    }

    if (status >= 500) {
      return new ServerError(status);
    }

    return new ServerError(status, response.data?.message);
  }

  if ((error as any)?.code === 'ECONNABORTED') {
    return new TimeoutError();
  }

  return new Error(error instanceof Error ? error.message : '发生了未知错误') as AppError;
};
