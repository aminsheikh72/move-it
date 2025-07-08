import React from 'react';
import { Package } from 'lucide-react';

const BoxesLoader = ({ size, message }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <Package
            key={i}
            className={`${sizeClasses[size]} text-purple-500`}
            style={{
              animation: `boxFloat 1.5s ease-in-out infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
      {message && <p className="text-slate-300 text-sm font-medium">{message}</p>}
      <style jsx>{`
        @keyframes boxFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
};

export default BoxesLoader;