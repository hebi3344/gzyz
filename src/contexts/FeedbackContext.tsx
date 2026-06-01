import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

export interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

interface FeedbackContextType {
  feedback: FeedbackMessage[];
  showFeedback: (feedback: Omit<FeedbackMessage, 'id'>) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string, action?: FeedbackMessage['action']) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  dismissFeedback: (id: string) => void;
  clearAllFeedback: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackMessage[]>([]);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const showFeedback = useCallback((newFeedback: Omit<FeedbackMessage, 'id'>) => {
    const id = generateId();
    const feedbackItem: FeedbackMessage = {
      ...newFeedback,
      id,
      duration: newFeedback.duration ?? 5000,
      dismissible: newFeedback.dismissible ?? true,
    };

    setFeedback(prev => [...prev, feedbackItem]);

    if (feedbackItem.duration && feedbackItem.duration > 0) {
      setTimeout(() => {
        dismissFeedback(id);
      }, feedbackItem.duration);
    }
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    showFeedback({ type: 'success', title, message });
  }, [showFeedback]);

  const showError = useCallback((title: string, message?: string, action?: FeedbackMessage['action']) => {
    showFeedback({
      type: 'error',
      title,
      message,
      action,
      duration: action ? 0 : 8000,
    });
  }, [showFeedback]);

  const showWarning = useCallback((title: string, message?: string) => {
    showFeedback({ type: 'warning', title, message });
  }, [showFeedback]);

  const showInfo = useCallback((title: string, message?: string) => {
    showFeedback({ type: 'info', title, message });
  }, [showFeedback]);

  const dismissFeedback = useCallback((id: string) => {
    setFeedback(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearAllFeedback = useCallback(() => {
    setFeedback([]);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        showFeedback,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        dismissFeedback,
        clearAllFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
