import React from 'react';

const SpinnerLoader = ({ size, message }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-slate-600 border-t-purple-500 rounded-full animate-spin`}></div>
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-pink-500 rounded-full animate-spin`}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
      </div>
      {message && <p className="text-slate-300 text-sm font-medium animate-pulse">{message}</p>}
    </div>
  );
};

export default SpinnerLoader;