import axios from "axios"

const getUsers=async(token)=>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get('/api/admin/get-users',options)   
    return response.data
}
const getBookings=async(token)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
const response = await axios.get('/api/admin/get-bookings',options)
return response.data

}
const getAdminVehicles=async(token)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
const response = await axios.get('/api/admin/get-vehicles',options)
return response.data

}
const getAdminComments=async(token)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
const response = await axios.get('/api/admin/comments',options)

return response.data

}

const updateBooking=async(token,formData)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
const{bookingId,status}=formData
const response = await axios.put(`/api/admin/booking/${bookingId}`,{status},options)
return response.data
}

const addAdminVehicle=async(token,formData)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}

const response = await axios.post('/api/admin/add-vehicle',formData,options)
return response.data

}

const removeAdminVehicle=async(token,id)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}
const response = await axios.delete(`/api/admin/remove-vehicle/${id}`,options)
return response.data

}

const updateAdminVehicle=async(token,formData)=>{
const options ={
    headers : {
        authorization : `Bearer ${token}`
    }
}

const response = await axios.put(`/api/admin/update-vehicle/${formData._id}`,formData,options)
return response.data

}



const adminService = {getUsers,getBookings,getAdminVehicles,updateBooking,getAdminComments,addAdminVehicle,removeAdminVehicle,updateAdminVehicle}
export default adminService