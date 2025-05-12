const Booking = require("../models/bookingModel")
const Vehicle = require("../models/vehicleModel")

const addBooking=async(req,res)=>{
    const vehicle = await Vehicle.findById(req.params.uid)
    if(!vehicle){
        res.status(400)
        throw new Error("Vehicle not found!!")
    }
    const {pickupLocation,dropLocation,weight,distance}= req.body
    if(!pickupLocation || !dropLocation || !weight || !distance){
        res.status(400)
        throw new Error("Please fill all details!!!")
    }
    const newBooking = await Booking.create({
        user : req.user._id,
        vehicle : vehicle._id,
        pickupLocation : pickupLocation,
        dropLocation : dropLocation,
        distance : distance,
        totalBill : vehicle.rate * distance,
        weight : weight,
        status : "pending",
        estimatedDeliveryTime : "1 day"
    })
    if(!newBooking){
        res.status(400)
        throw new Error("Vehicle not book, Please try again!!")
    }
    res.status(201).json(newBooking)

}

const getBooking = async(req,res)=>{
    const booking = await Booking.findById(req.params.bid).populate('user', '-password')
    if(!booking){
        res.status(404)
        throw new Error("Booking not found")
    }
    res.status(200).json(booking)

}

const cancelBooking=async(req,res)=>{
    const findBooking = await Booking.findById(req.params.bid)
    if(!findBooking){
        res.status(404)
        throw new Error("Booking not found")
    }
    if(findBooking.status === "accepted"){
        res.status(400)
        throw new Error("Booking not cancelled")
    }
    else{
    const cancel = await Booking.findByIdAndUpdate(req.params.bid, {status : "cancelled"}, {new : true})
    res.status(200).json(cancel)

    }
}
module.exports = {addBooking, getBooking,cancelBooking} 