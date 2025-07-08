import React from 'react';
import Loader from './Loader';

const LoaderOverlay = ({
  isVisible,
  type = 'truck',
  message = 'Processing your request...',
  size = 'lg'
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 mx-4 max-w-sm w-full">
        <Loader type={type} size={size} message={message} />
      </div>
    </div>
  );
};

export default LoaderOverlay;
