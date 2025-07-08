import React, { useEffect, useState } from "react";
import { Filter, Plus, Truck, MoreVertical, Edit, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdminVehicles,
  removeVehicle,
  updateVehicle,
} from "../../../features/admin/adminSlice";
import { toast } from "react-toastify";
import TruckLoader from "../../components/loaders/TruckLoader";
import BoxesLoader from "../../components/loaders/BoxesLoader";

const Vehicles = () => {
  const { vehicles, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.admin
  );
  const [more, isMore] = useState(false);
  const[vehicleData,setVehicleData]=useState(null)

  const getStatusColor = (status) => {
  switch (status) {
    case "available":
      return "bg-green-500/20 text-green-400";
    case "unavailable":
      return "bg-blue-500/20 text-blue-400";
    default:
      return "bg-yellow-500/20 text-yellow-400";
  }
};

  const[isEdit,setIsEdit]=useState(false)
  const dispatch = useDispatch();



  const handleRemove = async (id) => {
    try {
       await dispatch(removeVehicle(id)).unwrap();

      toast.success("Vehicle remove successfully", {
        position: "top-center",
      });
    
    dispatch(getAllAdminVehicles());
    } catch (error) {
      toast.error("Failed to remove vehicle",{
        position  :"top-center"
      })
    }
  };

  const handleChange=(e)=>{
    setVehicleData({
      ...vehicleData,
      [e.target.name]:e.target.value
    })

  }
  
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      await dispatch(updateVehicle(vehicleData)).unwrap()
      toast.success("Vehicle update Successfully")
      setIsEdit(false)
      dispatch(getAllAdminVehicles())
    } catch (error) {
      toast.error(message,{
        position : "top-center"
      })
    }

    
  }



  useEffect(() => {
    dispatch(getAllAdminVehicles());
  }, [dispatch]);
  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [isError, message]);

  return (
    <>{
      isEdit ? (
        <div className="space-y-6">
      <div className=" flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-white">Update Vehicle</h2>
<button onClick={()=>setIsEdit(false)}><X/></button>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      {isLoading ? (<BoxesLoader/>): (<form className="space-y-6" onSubmit={handleUpdate} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Name</label>
              <input
                type="text"
                name = "name"
              value={vehicleData.name}
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
              value={vehicleData.rate}
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
               value={vehicleData.capacity}
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
               value={vehicleData.registration}
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
              value={vehicleData.image}
              onChange={handleChange}
                placeholder="Enter image url"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select name='isAvailable' value={vehicleData.isAvailable} onChange={handleChange}  className="w-full bg-gray-600 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
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
            value={vehicleData.description}
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
              Update vehicle
            </button>
           
          </div>
        </form>)}
        
      </div>
    </div>
      ) : (
         <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">All Vehicles</h2>
          <p className="text-gray-300">Manage your fleet of vehicles</p>
        </div>
      </div>
      {isLoading ? <TruckLoader /> : ""}
<div className=" w-full flex items-center justify-center"> {vehicles.length === 0 ? <h1 className=" text-center text-4xl text-gray-300 font-mono font-medium">Vehicles not yet</h1> :""}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     
        {  vehicles?.map((vehicle) => (
          <div
            key={vehicle?._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
          
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gradient-to-r from-purple-500 overflow-hidden to-pink-500 rounded-lg flex items-center justify-center h-40">
                <img
                  className=" w-full"
                  src={vehicle?.image}
                  alt={vehicle?.name}
                />
              </div>
              <button className="text-gray-400 hover:text-white transition-colors"></button>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-gray-300 uppercase">name : {vehicle?.name}</p>
              <p className="text-gray-300 md:text-sm text-[10px]  uppercase">
                registration : {vehicle?.registration}
              </p>
              <p className="text-gray-300 md:text-sm text-[10px]  uppercase">
                capacity : {vehicle?.capacity} kg
              </p>
              <p className="text-gray-300 md:text-sm text-[10px]  uppercase">
                rate : {vehicle?.rate} / km
              </p>
              <p
                className={`text-gray-300 md:text-sm text-[10px] ${
                  !more ? "line-clamp-2" : ""
                }   uppercase`}
              >
                description : {vehicle?.description}
              </p>
              <button
                onClick={() => isMore(!more)}
                className="text-gray-300 md:text-sm text-[10px] uppercase"
              >
                more
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  vehicle?.status
                )}`}
              >
                {vehicle?.isAvailable === "available" ? "Available" : "In Use"}
              </span>
              <div className="flex gap-2">
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  <Edit onClick={()=>{setIsEdit(true)
                  setVehicleData(vehicle)}} size={16} />
                </button>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 onClick={() => handleRemove(vehicle._id)} size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      )
    }
   
    </>
  );
};

export default Vehicles;
