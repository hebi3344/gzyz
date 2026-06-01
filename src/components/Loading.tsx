import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = '加载中...',
  fullScreen = false,
  overlay = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const spinnerClasses = `animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]}`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="text-center">
          <div className={spinnerClasses}></div>
          {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg z-10">
        <div className="text-center">
          <div className={spinnerClasses}></div>
          {text && <p className="mt-4 text-gray-600 text-sm">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className={spinnerClasses}></div>
        {text && <p className="mt-4 text-gray-600">{text}</p>}
      </div>
    </div>
  );
};

interface ProgressLoadingProps {
  progress: number;
  text?: string;
}

export const ProgressLoading: React.FC<ProgressLoadingProps> = ({
  progress,
  text = '加载中...',
}) => {
  return (
    <div className="w-full max-w-md mx-auto py-8">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center">
          <div className="relative h-16 w-16">
            <svg className="h-16 w-16 transform rotate-[-90deg]">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-blue-600"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
      {text && <p className="text-center text-gray-600">{text}</p>}
    </div>
  );
};

export default Loading;
