import React from 'react';
import { chatTheme } from './theme';

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
}

const LoadingIndicator = ({ message = 'Thinking...', className = '' }: LoadingIndicatorProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex space-x-1">
        <div className={`w-1.5 h-1.5 ${chatTheme.loading.dots} rounded-full animate-bounce`}></div>
        <div
          className={`w-1.5 h-1.5 ${chatTheme.loading.dots} rounded-full animate-bounce`}
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className={`w-1.5 h-1.5 ${chatTheme.loading.dots} rounded-full animate-bounce`}
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
      <span className={`${chatTheme.loading.text} text-xs`}>{message}</span>
    </div>
  );
};

export default LoadingIndicator;
