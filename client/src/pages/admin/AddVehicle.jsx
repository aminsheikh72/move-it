import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle } from '../../../features/admin/adminSlice';
import { toast } from 'react-toastify';
import BoxesLoader from './../../components/loaders/BoxesLoader';

const AddVehicle = () => {
  const {isLoading,isSuccess,isError,message}= useSelector(state=> state.admin)
  const[formData,setFormData]= useState({
    name : "", image : "", isAvailable : "", capacity : "", rate : "", description : "",registration : ""
  })
  const{name,image,description,isAvailable,capacity,rate,registration}= formData
  const dispatch = useDispatch()

  const handleChange=(e)=>{
setFormData({
  ...formData,
  [e.target.name] : e.target.value
})
  }
 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(addVehicle(formData));
  setFormData({
    name: "",
    image: "",
    isAvailable: "",
    capacity: "",
    rate: "",
    description: "",
    registration: ""
  });
  if(isSuccess){
  toast.success("Vehicle added successfully",{
    position : "top-center"
  })
  }
};
useEffect(()=>{

  if(isError && message){
    toast.error(message,{
      position : "top-center"
    })
}
},[isError,message])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Add New Vehicle</h2>
        <p className="text-gray-300">Add a new vehicle to your fleet</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      {isLoading ? (<BoxesLoader/>): (<form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Name</label>
              <input
                type="text"
                name = "name"
                value={name}
                onChange={handleChange}
                placeholder="Enter vehicle name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Rate</label>
              <input
                type="text"
                name = "rate"
                value={rate}
                onChange={handleChange}
                placeholder="Enter vehicle rate"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Capacity</label>
              <input
                type="text"
                name = "capacity"
                value={capacity}
                onChange={handleChange}
                placeholder="e.g., 300"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registration Number</label>
              <input
                type="text"
                name = "registration"
                value={registration}
                onChange={handleChange}
                placeholder="Enter license plate"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Image</label>
              <input
                type="text"
                name = "image"
                value={image}
                onChange={handleChange}
                placeholder="Enter image url"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select name='isAvailable' value={isAvailable} onChange={handleChange} className="w-full bg-gray-600 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Select</option>
                <option value="available">Available</option>
                 <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              rows="4"
              name='description'
              value={description}
              onChange={handleChange}
              placeholder="Enter vehicle description"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Vehicle
            </button>
           
          </div>
        </form>)}
        
      </div>
    </div>
  );
};

export default AddVehicle;