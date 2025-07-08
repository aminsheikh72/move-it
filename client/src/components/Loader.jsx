import React from 'react';
import SpinnerLoader from './loaders/SpinnerLoader';
import TruckLoader from './loaders/TruckLoader';
import BoxesLoader from './loaders/BoxesLoader';
import DotsLoader from './loaders/DotsLoader';
import PulseLoader from './loaders/PulseLoader';

const Loader = ({ type = 'spinner', size = 'md', message = 'Loading...' }) => {
  const containerSizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const renderLoader = () => {
    switch (type) {
      case 'truck':
        return <TruckLoader size={size} message={message} />;
      case 'boxes':
        return <BoxesLoader size={size} message={message} />;
      case 'dots':
        return <DotsLoader size={size} message={message} />;
      case 'pulse':
        return <PulseLoader size={size} message={message} />;
      default:
        return <SpinnerLoader size={size} message={message} />;
    }
  };

  return (
    <div className={`flex h-screen items-center justify-center ${containerSizeClasses[size]} `}>
      <div className="text-center">
        {renderLoader()}
      </div>
    </div>
  );
};

export default Loader;