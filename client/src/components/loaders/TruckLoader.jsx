import React from 'react';
import { Truck } from 'lucide-react';

const TruckLoader = ({ size, message }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="relative overflow-hidden w-20 h-12">
      <Truck
        className={`absolute text-purple-500 ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} animate-bounce`}
        style={{ animation: 'truckMove 2s ease-in-out infinite' }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-600 rounded">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded animate-pulse"
          style={{ width: '30%', animation: 'roadMove 2s linear infinite' }}
        ></div>
      </div>
    </div>
    {message && <p className="text-slate-300 text-sm font-medium">{message}</p>}
    <style jsx>{`
      @keyframes truckMove {
        0%, 100% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
      }
      @keyframes roadMove {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(300%); }
      }
    `}</style>
  </div>
);

export default TruckLoader;