import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../../../features/admin/adminSlice';
import { addComment } from '../../../features/vehicles/vehicleSlice';

const Reviews = () => {
  const { comments } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const [replyText, setReplyText] = useState({});
  const [replyOpenForBooking, setReplyOpenForBooking] = useState(null);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const groupedComments = comments.reduce((acc, comment) => {
    const bookingId = comment.booking?._id;
    if (!acc[bookingId]) acc[bookingId] = [];
    acc[bookingId].push(comment);
    return acc;
  }, {});

  const handleReplySubmit = async (bookingId) => {
    const text = replyText[bookingId];
    if (!text?.trim()) return;

    await dispatch(addComment({ bookingId, text }));
    setReplyText(prev => ({ ...prev, [bookingId]: '' }));
    setReplyOpenForBooking(null);
    dispatch(getAllComments());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">All Comments</h2>
          <p className="text-gray-300">Manage all customer comments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(groupedComments).map(([bookingId, commentList]) => (
          <div key={bookingId} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-white font-bold mb-2">Booking ID: {bookingId}</h3>

            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {commentList.map((c, index) => (
                <div key={index} className="text-sm text-gray-300 bg-white/5 p-2 rounded-md">
                  <span className={`px-2 py-1 font-medium rounded-sm mr-3 ${
                    c?.user?.isAdmin ? "bg-yellow-400 text-black" : "bg-gray-300 text-white"
                  }`}>
                    {c?.user?.isAdmin ? "Admin" : c?.user?.name}
                  </span>
                  {c.text}
                </div>
              ))}
            </div>

            {replyOpenForBooking === bookingId ? (
              <div className='flex gap-2'>
                <input
                  className='bg-transparent border border-white/20 text-white rounded-md px-3 py-1 flex-1'
                  type="text"
                  placeholder="Reply to this booking..."
                  value={replyText[bookingId] || ''}
                  onChange={(e) => setReplyText(prev => ({ ...prev, [bookingId]: e.target.value }))}
                />
                <button
                  onClick={() => handleReplySubmit(bookingId)}
                  className='text-yellow-400 hover:text-yellow-300'
                >
                  <Send size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setReplyOpenForBooking(bookingId)}
                className="mt-2 text-green-400 text-sm"
              >
                Reply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
