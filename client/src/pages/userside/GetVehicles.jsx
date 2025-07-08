import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookVehicle,
  getUserVehicles,
  storeBookingData,
} from "../../../features/vehicles/vehicleSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BoxesLoader from "../../components/loaders/BoxesLoader";

const GetVehicles = () => {
  const { userVehicles, bookingData, message, isLoading, isError } =
    useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingData || !bookingData.weight) {
      const savedData = localStorage.getItem("bookingData");
      if (savedData) {
        dispatch(storeBookingData(JSON.parse(savedData)));
      }
    }
  }, [bookingData, dispatch]);
  const filterVehicle = bookingData?.weight
    ? userVehicles.filter((vehicle) => {
        const userWeight = Number(bookingData.weight);
        const capacity = Number(vehicle.capacity);

        if (userWeight >= 0 && userWeight <= 20) return capacity <= 20;
        if (userWeight > 20 && userWeight <= 100)
          return capacity > 20 && capacity <= 100;
        if (userWeight > 100 && userWeight <= 5000)
          return capacity > 100 && capacity <= 5000;
        if (userWeight > 5000 && userWeight <= 30000)
          return capacity > 5000 && capacity <= 30000;

        return false;
      })
    : [];

  const handleBook = async (e, id) => {
    e.preventDefault();
    try {
      await dispatch(bookVehicle({ id, bookingData })).unwrap();
      toast.success("Booking add successfully", {
        position: "top-center",
      });
      navigate("/my-bookings");
    } catch (error) {
      toast.error(message, {
        position: " top-center ",
      });
    }
  };

  useEffect(() => {
    dispatch(getUserVehicles());
  }, [dispatch]);
  const getStatusColor = (available = "") => {
    return available.toLowerCase() === "available"
      ? "bg-green-500/20 text-green-400"
      : "bg-blue-500/20 text-blue-400";
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [isError, message]);

  return (
    <div className="space-y-6 p-6 mt-14 md:mt-20">
      {filterVehicle.length === 0 && !isLoading && (
        <p className="text-white text-center w-full col-span-full">
          No vehicles available for the selected weight.
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">All Vehicles</h2>
          <p className="text-gray-300">Manage your fleet of vehicles</p>
        </div>
      </div>
      <div className=" w-full items-center justify-center">
        {isLoading ? <BoxesLoader /> : ""}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterVehicle?.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <div className="bg-gradient-to-r  from-purple-500 to-pink-500 rounded-lg overflow-hidden mb-4 h-40 flex justify-center items-center">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-full w-full object-cover "
              />
            </div>

            <div className="space-y-1 mb-4 text-sm text-gray-300 uppercase">
              <p>
                <strong>Name:</strong> {vehicle.name}
              </p>
              <p>
                <strong>Reg. No:</strong> {vehicle.registration}
              </p>
              <p>
                <strong>Capacity:</strong> {vehicle.capacity} kg
              </p>
              <p>
                <strong>Rate:</strong> ₹{vehicle.rate}/km
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  vehicle?.isAvailable || "unknown"
                )}`}
              >
                {vehicle?.isAvailable === "available" ? "Available" : "In Use"}
              </span>

              <button
                disabled={vehicle.isAvailable !== "available"}
                onClick={(e) => handleBook(e, vehicle._id)}
                className={`text-gray-800 px-5 rounded-sm  ${
                  vehicle.isAvailable !== "available"
                    ? "cursor-not-allowed bg-gray-500"
                    : "bg-yellow-400 cursor-pointer"
                }`}
              >
                {vehicle.isAvailable === "available"
                  ? "Book"
                  : "Already Booked"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetVehicles;
