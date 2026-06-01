import { useState, useEffect, useCallback } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import React from 'react';
import { useFeedback as useFeedbackContext } from '../contexts/FeedbackContext';

interface UseNetworkOptions {
  onOnline?: () => void;
  onOffline?: () => void;
  showNotification?: boolean;
}

interface UseNetworkReturn {
  isOnline: boolean;
  effectiveIsOnline: boolean;
  wasOffline: boolean;
  checkConnection: () => Promise<boolean>;
}

export const useNetwork = (options: UseNetworkOptions = {}): UseNetworkReturn => {
  const {
    onOnline,
    onOffline,
    showNotification = true,
  } = options;

  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [wasOffline, setWasOffline] = useState(false);
  const [feedbackContext, setFeedbackContext] = useState<ReturnType<typeof useFeedbackContext> | null>(null);

  useEffect(() => {
    try {
      const context = useFeedbackContext();
      setFeedbackContext(context);
    } catch {
      setFeedbackContext(null);
    }
  }, []);

  const showSuccess = feedbackContext?.showSuccess;
  const showWarning = feedbackContext?.showWarning;

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);

      if (wasOffline && showNotification && showSuccess) {
        showSuccess('网络已恢复', '您的网络连接已恢复，现在可以继续操作');
      }

      if (onOnline) {
        onOnline();
      }

      setWasOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);

      if (showNotification && showWarning) {
        showWarning('网络已断开', '您的网络连接已断开，请检查网络设置');
      }

      if (onOffline) {
        onOffline();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline, showNotification, onOnline, onOffline, showSuccess, showWarning]);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-cache',
      });
      const online = response.ok;
      setIsOnline(online);
      return online;
    } catch {
      setIsOnline(false);
      return false;
    }
  }, []);

  const effectiveIsOnline = isOnline;

  return {
    isOnline,
    effectiveIsOnline,
    wasOffline,
    checkConnection,
  };
};

export const NetworkStatusBanner: React.FC = () => {
  const { isOnline, wasOffline } = useNetwork();

  if (isOnline || !wasOffline) return null;

  return React.createElement('div', {
    className: 'fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 z-50 flex items-center justify-center'
  }, [
    React.createElement(WifiOff, { className: 'h-4 w-4 mr-2', key: 'icon' }),
    React.createElement('span', {
      className: 'text-sm font-medium',
      key: 'text'
    }, '网络连接不稳定，部分功能可能无法使用')
  ]);
};

export const NetworkStatusIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isOnline } = useNetwork({ showNotification: false });

  return React.createElement('div', {
    className: `flex items-center space-x-1 ${className}`
  }, isOnline ? [
    React.createElement(Wifi, { className: 'h-4 w-4 text-green-600', key: 'icon' }),
    React.createElement('span', { className: 'text-xs text-green-600', key: 'text' }, '在线')
  ] : [
    React.createElement(WifiOff, { className: 'h-4 w-4 text-red-600', key: 'icon' }),
    React.createElement('span', { className: 'text-xs text-red-600', key: 'text' }, '离线')
  ]);
};

export default useNetwork;
