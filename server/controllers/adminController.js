const Booking = require("../models/bookingModel")
const User = require("../models/userSchema")
const Vehicle = require("../models/vehicleModel")
const Comment = require("../models/commentSchema")

const addVehicle=async(req,res)=>{
    const {name,rate,registration,isAvailable,description,capacity,image}= req.body
    if(!name || !rate || !registration || ! isAvailable || !description || !capacity || !image){
        res.status(400)
        throw new Error("please fill all details")
    }
    const addVehicle = await Vehicle.create({name,rate,isAvailable,registration,capacity,image,description})
    if(!addVehicle){
        res.status(400)
        throw new Error("vehicle not added!!")
    }
    res.status(201).json(addVehicle)
}
const updateVehicle=async(req,res)=>{
    const updateVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {new : true})
    if(!updateVehicle){
        res.status(400)
        throw new Error("Vehicle not update!!")
    }
    res.status(200).json(updateVehicle)
}
const removeVehicle=async(req,res)=>{
     await Vehicle.findByIdAndDelete(req.params.id)
    res.status(200).json({
        id : req.params.id,
        msg : "vehicle deleted"

    })
}
const getAllBookings=async(req,res)=>{
const bookings = await Booking.find().populate('vehicle').populate("user")
if(!bookings){
    res.status(404)
    throw new Error("Booking not found")
}
res.status(200).json(bookings)
}
const getAllUsers=async(req,res)=>{
const users = await User.find()
if(!users){
    res.status(404)
    throw new Error("users not found")
}
res.status(200).json(users)
}
const getAllVehicles=async(req,res)=>{
const vehicles = await Vehicle.find()
if(!vehicles){
    res.status(404)
    throw new Error("vehicles not found")
}
res.status(200).json(vehicles)
}

const updateBooking = async (req, res) => {
  const { status } = req.body;

  const updatedBooking = await Booking.findByIdAndUpdate(req.params.bid, req.body, { new: true });

  if (!updatedBooking) {
    res.status(400);
    throw new Error("Booking not updated");
  }

  // Mark vehicle available if status is pending or completed
  if (status === "pending" || status === "completed") {
    await Vehicle.findByIdAndUpdate(updatedBooking.vehicle, {
      isAvailable: "available",
    });
  }

  //  Mark vehicle unavailable if booking is active
  if (status === "in-progress") {
    await Vehicle.findByIdAndUpdate(updatedBooking.vehicle, {
      isAvailable: "unavailable",
    });
  }

  // 🗑️ Auto delete booking if cancelled
  if (status === "cancelled") {
    await Vehicle.findByIdAndUpdate(updatedBooking.vehicle, {
      isAvailable: true,
    });

    setTimeout(async () => {
      try {
        await Booking.findByIdAndDelete(req.params.bid);
        console.log(`Booking ${req.params.bid} deleted after 1 minute`);
      } catch (err) {
        console.error("Error deleting cancelled booking:", err);
      }
    }, 60 * 1000); // 1 minute
  }

  res.status(200).json(updatedBooking);
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "-password") // user details, exclude password
    .populate("booking"); // full booking details

  if (!comments || comments.length === 0) {
    res.status(404);
    throw new Error("Comments not found");
  }

  res.status(200).json(comments);
};

module.exports = {addVehicle,updateVehicle,removeVehicle,getAllBookings,getAllUsers,getAllVehicles,updateBooking,getAllComments}