import React from 'react';

const DotsLoader = ({ size, message }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
            style={{
              animation: `dotBounce 1.4s ease-in-out infinite ${i * 0.16}s`
            }}
          ></div>
        ))}
      </div>
      {message && <p className="text-slate-300 text-sm font-medium">{message}</p>}
      <style jsx>{`
        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default DotsLoader;