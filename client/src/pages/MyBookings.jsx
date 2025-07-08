import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  cancelBooking,
  getUserBooking,
  getUserComments,
} from "../../features/vehicles/vehicleSlice";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userBookings, commentsByBookingId,message,isLoading,isSuccess,isError } = useSelector(
    (state) => state.vehicle
  );
const [inputText, setInputText] = useState({});
  const handleCommentSubmit = (bookingId) => {
    if (!inputText[bookingId]) return;
    dispatch(addComment({ bookingId, text: inputText[bookingId] }));
    setInputText((prev) => ({ ...prev, [bookingId]: "" }));
  };
  const handleCancelBooking=async(bid)=>{
try {
  await dispatch(cancelBooking(bid)).unwrap()
  toast.success("booking cancelled successfully",{
    position : "top-center"
  })
} catch (error) {
  toast.error(message,{
    position : "top-center"
  })
}
  }

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserBooking(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (userBookings && userBookings.length > 0) {
      userBookings.forEach((booking) => {
        dispatch(getUserComments(booking._id));
      });
    }
  }, [dispatch, userBookings]);
  useEffect(()=>{
if(isError && message){
  toast.error(message,{position : "top-center"})
}
  },[isError,message])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-400 bg-green-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20";
      case "cancelled":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="p-6 mt-16 space-y-6">
      <div className="text-white">
        <h2 className="text-3xl font-bold">My Bookings</h2>
        <p className="text-gray-400">Here are all your recent bookings</p>
      </div>
      {userBookings.length ===0 &&(
<div className=" w-full flex items-center justify-center"><h1 className=" text-2xl text-center">No bookings yet</h1></div>
      ) }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userBookings?.map((booking) => {
          const comments = commentsByBookingId?.[booking._id] || [];

          return (
            <div
              key={booking._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl transition-all hover:bg-white/15 hover:scale-105"
            >
              <div className="h-40 rounded-xl overflow-hidden mb-4">
                <img
                  src={booking?.vehicle?.image}
                  alt={booking?.vehicle?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-sm text-gray-300 uppercase">
                <p>
                  <strong>Name:</strong> {booking?.vehicle?.name}
                </p>
                <p>
                  <strong>Reg. No:</strong> {booking?.vehicle?.registration}
                </p>
                <p>
                  <strong>Capacity:</strong> {booking?.vehicle.capacity} KG
                </p>
                <p>
                  <strong>Rate:</strong> ₹{booking?.vehicle?.rate}/km
                </p>
                <p>
                  <strong>Weight:</strong> {booking.weight} KG
                </p>
                <p>
                  <strong>Distance:</strong> {booking.distance} KM
                </p>
                <p>
                  <strong>Pickup:</strong> {booking.pickupLocation}
                </p>
                <p>
                  <strong>Drop:</strong> {booking.dropLocation}
                </p>
                <p>
                  <strong>Est. Delivery:</strong>{" "}
                  {booking.estimatedDeliveryTime}
                </p>
                <p>
                  <strong>Total Bill:</strong> ₹{booking.totalBill}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </p>
               <div className=" w-full flex items-center justify-between">
                 <p>
                  <strong>Updated:</strong>{" "}
                  {new Date(booking.updatedAt).toLocaleString()}
                </p>
               {booking?.status === "pending" ? ( <button onClick={()=> dispatch(cancelBooking(booking._id))} className=" bg-red-500 px-4 py-2 rounded-sm font-thin">Cancel booking</button>):""}
               </div>
              </div>

              {/* 💬 Comments Section */}
              {booking.status !== "completed" && (
                <div className="mt-4 border border-white/20 rounded-md p-2">
                  {/* Input */}
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Ask something to admin..."
                      value={inputText[booking._id] || ""}
                      onChange={(e) =>
                        setInputText((prev) => ({
                          ...prev,
                          [booking._id]: e.target.value,
                        }))
                      }
                      className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleCommentSubmit(booking._id)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Send size={20} />
                    </button>
                  </div>

                  {/* Existing Comments */}
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {comments && comments.length > 0 ? (
                      comments.map((commentObj, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-300 bg-white/10 p-2 rounded-md"
                        >
                          <span
                            className={`px-2 py-1 font-medium rounded-sm mr-3 ${
                              commentObj?.user?.isAdmin
                                ? "bg-yellow-400 text-black"
                                : "bg-gray-300 text-white"
                            }`}
                          >
                            {commentObj?.user?.isAdmin ? "Admin" : "You"}
                          </span>
                          {commentObj.text}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No comments yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
