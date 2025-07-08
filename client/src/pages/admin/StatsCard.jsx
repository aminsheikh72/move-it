import React, { useEffect } from 'react';
import { getAllAdminVehicles, getAllBookings, getAllComments, getAllUsers } from '../../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BookIcon, Car, Star, User } from 'lucide-react';
import SpinnerLoader from '../../components/loaders/SpinnerLoader';
import { toast } from 'react-toastify';

const StatsCard = () => {
   const {users,bookings,vehicles,isError,message,isLoading,comments}= useSelector(state=> state.admin)
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(getAllUsers())
dispatch(getAllBookings())
dispatch(getAllAdminVehicles())
dispatch(getAllComments())
  },[dispatch])
  useEffect(()=>{
if(isError && message){
  toast.error(message , {
    position :"top-center"
  })
}
  },[isError,message])

  

 
  return (
   <>
    {isLoading ? <SpinnerLoader/> : (
      <> <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">Total Users</p>
          <p className="text-3xl font-bold text-white">{users.length}</p>
        </div>
        <div className={`bg-gradient-to-r text-gray-400 p-3 rounded-full`}>
          <User className="text-white" size={24} />
        </div>
      </div>
      
      
    </div>
     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">Total Bookings</p>
          <p className="text-3xl font-bold text-white">{bookings.length}</p>
        </div>
        <div className={`bg-gradient-to-r text-gray-400 p-3 rounded-full`}>
          <BookIcon className="text-white" size={24} />
        </div>
      </div>
      
      
    </div>
     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">Total Comments</p>
          <p className="text-3xl font-bold text-white">{comments.length}</p>
        </div>
        <div className={`bg-gradient-to-r text-gray-400 p-3 rounded-full`}>
          <Star className="text-white" size={24} />
        </div>
      </div>
      
      
    </div>
     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">Total Vehicles</p>
          <p className="text-3xl font-bold text-white">{vehicles.length}</p>
        </div>
        <div className={`bg-gradient-to-r text-gray-400 p-3 rounded-full`}>
          <Car className="text-white" size={24} />
        </div>
      </div>
      
      
    </div></>
    )}
   </>
  );
};

export default StatsCard;