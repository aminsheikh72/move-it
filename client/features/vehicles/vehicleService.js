import axios from "axios"

const getUserSideVehicles=async()=>{
    const response = await axios.get('/api/vehicle')
    
    return response.data
}
const getMyBooking=async(token,uid)=>{
    const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
    const response = await axios.get(`/api/booking/${uid}`,options)
    return response.data
}
const getCommentsByUser = async (token, bid) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/booking/${bid}/comment`, options);
  return { bookingId: bid, comments: response.data }; //  wrap with bookingId
};


const bookingUserVehicle=async(token,formData)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
const response = await axios.post(`/api/booking/${formData.id}`,formData.bookingData,options)
return response.data

}

const cancelBookingByUser = async (token, bid) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`/api/booking/${bid}`, {}, options);
  // console.log(response.data);
  return response.data;
};


const addComment = async (token, bookingId, text) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `/api/booking/${bookingId}/comment`,
    { text },
    options
  );
  
  return response.data;
};
const vehicleService ={getUserSideVehicles,bookingUserVehicle,getMyBooking,getCommentsByUser,addComment,cancelBookingByUser}
export default vehicleService