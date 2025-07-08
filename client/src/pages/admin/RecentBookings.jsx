import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../../features/admin/adminSlice';

const RecentBookings = () => {
  const {bookings}=useSelector((state)=>state.admin)
  let ExtractBookings = bookings.length > 4 ? bookings.slice(0,4) : bookings
  
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled': return 'bg-red-600 text-white';

      default: return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="bg-white/10 w-full backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Bookings</h3>
      <div className="space-y-3">
      {ExtractBookings.length === 0 ? <div className=' w-full flex items-center justify-center'><h1 className=' text-4xl font-serif'>No Bookings yet</h1></div>:""}
        {ExtractBookings?.map(booking => (
          <div key={booking?._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">{booking?.user?.name}</p>
              <p className="text-gray-300 text-sm">{booking?.pickupLocation} → {booking?.dropLocation}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
              {booking?.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;