import React, { useEffect, useState } from 'react';
import { ArrowDown, Edit } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings, updateAdminBooking } from '../../../features/admin/adminSlice';
import { toast } from 'react-toastify';
import TruckLoader from './../../components/loaders/TruckLoader';

const Bookings = () => {
  const { bookings, isError, message, isLoading } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const [isOpen, SetIsOpen] = useState(false);
  const [formData, setFormData] = useState({ status: '', bookingId: '' });

  const { bookingId, status } = formData;

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        position: 'top-center',
      });
    }
  }, [isError, message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!bookingId || !status) {
      toast.error("Please select status");
      return;
    }

    try {
      await dispatch(updateAdminBooking(formData)).unwrap();
      toast.success("Booking updated successfully");
      dispatch(getAllBookings())
      SetIsOpen(false);
      setFormData({ status: '', bookingId: '' });
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-[90%] max-w-md text-white shadow-xl transition-all duration-300 scale-100">
            <h2 className="text-xl font-bold mb-4 text-center">Update Booking Status</h2>

            <form onSubmit={handleUpdate}>
              <label className="block mb-2 text-sm text-white">Select Status</label>
              <select
                name='status'
                value={status}
                onChange={handleChange}
                className="w-full bg-white border border-white/30 rounded-lg p-2 text-gray-800 backdrop-blur placeholder:text-white/70"
              >
                <option value="">-- Select Status --</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    SetIsOpen(false);
                    setFormData({ status: '', bookingId: '' });
                  }}
                  type="button"
                  className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">All Bookings</h2>
          <p className="text-gray-300">Manage all customer bookings</p>
        </div>
      </div>

      {isLoading ? <TruckLoader /> : null}
      <div className=' w-full flex items-center justify-center'>{bookings.length === 0 ?<h1 className=' text-4xl font-serif'>No Bookings yet</h1> : ""}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings?.map((booking) => (
          <div key={booking?._id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase">customer : {booking?.user?.name}</h3>
                <h3 className="text-sm font-semibold text-white uppercase">vehicle : {booking?.vehicle?.name}</h3>
                <p className="text-gray-300 text-sm uppercase">capacity: {booking?.vehicle?.capacity}kg</p>
                <p className="text-gray-300 text-sm uppercase">rate : {booking?.vehicle?.rate}/km</p>
                <p className="text-gray-300 text-sm uppercase">weight : {booking?.weight}kg</p>
              </div>

              <button
                onClick={() => {
                  SetIsOpen(true);
                  setFormData({
                    bookingId: booking._id,
                    status: booking.status
                  });
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Edit />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">{booking?.pickupLocation}</span>
              </div>
              <span className='w-full flex uppercase'>
                <ArrowDown className='ml-9' />
                <p className="text-gray-300 text-[10px] uppercase flex items-center justify-center pl-3">distance : {booking?.distance}/km</p>
              </span>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">{booking?.dropLocation}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="md:text-xl text-sm font-bold text-white">Total bill : {booking?.totalBill}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${booking?.status === 'pending' ? 'bg-gray-500 text-white' :
                  booking?.status === 'in-progress' ? 'bg-yellow-500 text-black' :
                    booking?.status === 'completed' ? 'bg-green-500 text-white' :
                      booking?.status === 'cancelled' ? 'bg-red-500 text-white' : ''}
              `}>
                {booking?.status}
              </span>
            </div>
            <p className="text-gray-300 text-sm uppercase my-2">order date : {new Date(booking.createdAt).toLocaleDateString("en-GB")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
