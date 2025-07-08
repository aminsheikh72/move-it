import React, { useEffect } from 'react';
import { Users, Calendar, Star, Truck } from 'lucide-react';
import RecentBookings from './RecentBookings';
import StatsCard from './StatsCard';



const Dashboard = () => {

  
  
  

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <StatsCard/>
      </div>

      <div className=" flex items-center justify-center w-full">
        <RecentBookings />
      
      </div>
    </div>
  );
};

export default Dashboard;