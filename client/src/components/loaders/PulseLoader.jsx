import React from 'react';
import { RotateCw } from 'lucide-react';

const PulseLoader = ({ size, message }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative my-10">
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping`}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-purple-600 to-pink-600`}></div>
        <RotateCw className={`absolute inset-0 m-auto ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-white animate-spin`} />
      </div>
      {message && <p className="text-slate-300 text-sm font-medium animate-pulse">{message}</p>}
    </div>
  );
};

export default PulseLoader;