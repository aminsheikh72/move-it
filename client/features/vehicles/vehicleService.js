import axios from "axios"

const api_url = "https://move-it-backend-hnht.onrender.com"
const getUserSideVehicles=async()=>{
    const response = await axios.get(api_url +'/api/vehicle')
    
    return response.data
}
const getMyBooking=async(token,uid)=>{
    const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
    const response = await axios.get(`${api_url}/api/booking/${uid}`,options)
    return response.data
}
const getCommentsByUser = async (token, bid) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${api_url}/api/booking/${bid}/comment`, options);
  return { bookingId: bid, comments: response.data }; //  wrap with bookingId
};


const bookingUserVehicle=async(token,formData)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
const response = await axios.post(`${api_url}/api/booking/${formData.id}`,formData.bookingData,options)
return response.data

}

const cancelBookingByUser = async (token, bid) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${api_url}/api/booking/${bid}`, {}, options);
  // console.log(response.data);
  return response.data;
};


const addComment = async (token, bookingId, text) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api_url}/api/booking/${bookingId}/comment`,
    { text },
    options
  );
  
  return response.data;
};
const vehicleService ={getUserSideVehicles,bookingUserVehicle,getMyBooking,getCommentsByUser,addComment,cancelBookingByUser}
export default vehicleService