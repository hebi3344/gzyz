import React from 'react';
import { useFeedback, FeedbackMessage } from '../contexts/FeedbackContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast: React.FC<{ message: FeedbackMessage }> = ({ message }) => {
  const { dismissFeedback } = useFeedback();

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (message.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  return (
    <div
      className={`mb-3 p-4 rounded-lg border shadow-lg ${getStyles()} animate-slide-in`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className="font-medium">{message.title}</p>
          {message.message && (
            <p className="mt-1 text-sm opacity-90">{message.message}</p>
          )}
          {message.action && (
            <button
              onClick={message.action.onClick}
              className="mt-2 text-sm font-medium underline hover:no-underline"
            >
              {message.action.label}
            </button>
          )}
        </div>
        {message.dismissible && (
          <button
            onClick={() => dismissFeedback(message.id)}
            className="ml-3 flex-shrink-0 hover:opacity-70 transition-opacity"
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { feedback } = useFeedback();

  if (feedback.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 w-96 max-w-full"
      aria-live="polite"
      aria-label="通知"
    >
      {feedback.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Toast;
