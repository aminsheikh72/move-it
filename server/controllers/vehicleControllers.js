const Vehicle = require("../models/vehicleModel")

const getVehicles=async(req,res)=>{
    const vehicles = await Vehicle.find()
    if(!vehicles){
        res.status(404)
        throw new Error("vehicles not found!!!")
    }
    res.status(200).json(vehicles)
}
const getVehicle=async(req,res)=>{
    const vehicle = await Vehicle.findById(req.params.id)
    if(!vehicle){
        res.status(404)
        throw new Error("vehicle not found!!!")
    }
    res.status(200).json(vehicle)
}
module.exports = {getVehicles,getVehicle}