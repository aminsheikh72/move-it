import axios from "axios"

const api_url = "https://move-it-backend-hnht.onrender.com"

const getUsers=async(token)=>{
    const options = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(api_url + '/api/admin/get-users',options)   
    return response.data
}
const getBookings=async(token)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
const response = await axios.get(api_url + '/api/admin/get-bookings',options)
return response.data

}
const getAdminVehicles=async(token)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
const response = await axios.get(api_url + '/api/admin/get-vehicles',options)
return response.data

}
const getAdminComments=async(token)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
const response = await axios.get(api_url + '/api/admin/comments',options)

return response.data

}

const updateBooking=async(token,formData)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
const{bookingId,status}=formData
const response = await axios.put(`${api_url}/api/admin/booking/${bookingId}`,{status},options)
return response.data
}

const addAdminVehicle=async(token,formData)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}

const response = await axios.post(api_url + '/api/admin/add-vehicle',formData,options)
return response.data

}

const removeAdminVehicle=async(token,id)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}
const response = await axios.delete(`${api_url}/api/admin/remove-vehicle/${id}`,options)
return response.data

}

const updateAdminVehicle=async(token,formData)=>{
const options ={
    headers : {
        Authorization : `Bearer ${token}`
    }
}

const response = await axios.put(`${api_url}/api/admin/update-vehicle/${formData._id}`,formData,options)
return response.data

}



const adminService = {getUsers,getBookings,getAdminVehicles,updateBooking,getAdminComments,addAdminVehicle,removeAdminVehicle,updateAdminVehicle}
export default adminService