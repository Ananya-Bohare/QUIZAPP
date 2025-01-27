import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <ErrorBoundary>  
    <div className="relative h-4 bg-gray-400 rounded-full overflow-hidden"
    style={{ width: '100%', maxWidth: '900px' }}
    >
      {/* Background Bar */}
      <div
        className="absolute top-0 left-0 h-full bg-green-700  shadow-lg transition-all duration-500"
        style={{
          width: `${progress}%`,
        }}
      >
        {/* Glow Effect */}
        <div
          className="absolute right-0 h-full w-6 bg-gradient-to-r from-transparent to-green-300 opacity-50 blur-md"
          style={{
            transform: 'translateX(50%)',
          }}
        />
      </div>
      {/* Label */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300">
        {`${Math.min(progress, 100).toFixed(0)}%`}
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default ProgressBar;
