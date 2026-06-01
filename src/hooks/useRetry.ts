import { useState, useCallback, useRef } from 'react';
import { useFeedback } from '../contexts/FeedbackContext';
import { isRetryable, AppError } from '../lib/errors';

interface UseRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (attempt: number) => void;
}

interface UseRetryReturn<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
  retrying: boolean;
  attemptCount: number;
  execute: (fn: () => Promise<T>) => Promise<T | null>;
  retry: () => Promise<T | null>;
  cancel: () => void;
}

export const useRetry = <T,>(options: UseRetryOptions = {}): UseRetryReturn<T> => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onRetry,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const { showWarning, showSuccess, showError } = useFeedback();

  const execute = useCallback(
    async (fn: () => Promise<T>): Promise<T | null> => {
      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);
      setRetrying(false);

      let lastError: AppError | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        setAttemptCount(attempt);

        try {
          if (attempt > 1) {
            setRetrying(true);
            showWarning(
              `正在重试 (${attempt}/${maxRetries})`,
              `上一次尝试失败，正在重新连接...`
            );

            if (onRetry) {
              onRetry(attempt);
            }

            await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt - 1)));
          }

          const result = await fn();
          setData(result);
          setLoading(false);
          setRetrying(false);

          if (attempt > 1) {
            showSuccess('操作成功', `在第 ${attempt} 次尝试后成功`);
          }

          return result;
        } catch (err: any) {
          lastError = err as AppError;

          if (err instanceof Error && err.name === 'AbortError') {
            setError(lastError);
            setLoading(false);
            setRetrying(false);
            showError('操作已取消', '您取消了该操作');
            return null;
          }

          if (!isRetryable(err) || attempt === maxRetries) {
            setError(lastError);
            setLoading(false);
            setRetrying(false);
            showError('操作失败', lastError.userMessage || lastError.message);
            return null;
          }
        }
      }

      setError(lastError);
      setLoading(false);
      setRetrying(false);
      return null;
    },
    [maxRetries, retryDelay, onRetry, showWarning, showSuccess, showError]
  );

  const retry = useCallback(async (): Promise<T | null> => {
    if (error) {
      return execute(async () => {
        throw error;
      });
    }
    return null;
  }, [error, execute]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    data,
    loading,
    error,
    retrying,
    attemptCount,
    execute,
    retry,
    cancel,
  };
};
