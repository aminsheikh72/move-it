const Booking = require("../models/bookingModel")
const Vehicle = require("../models/vehicleModel")

// Get Coordinates
async function getCoordinates(city) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`);
    const data = await res.json();

    if (!data || data.length === 0) {
        throw new Error(`Location not found for: ${city}`);
    }

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
    };
}



// Get Harvshine
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}


async function getDistance(city1, city2) {
    const loc1 = await getCoordinates(city1);

    const loc2 = await getCoordinates(city2);

    const distance = haversine(loc1.lat, loc1.lon, loc2.lat, loc2.lon);
    return distance;
}


const addBooking = async (req, res) => {
  try {
    console.log("User from token:", req.user); // Check if user exists
    console.log("Vehicle ID:", req.params.vid);
    console.log("Request body:", req.body);
    
    const vehicle = await Vehicle.findById(req.params.vid);
    if (!vehicle) {
      console.log("Vehicle not found for ID:", req.params.vid);
      return res.status(400).json({ error: "Vehicle not found!!" });
    }

    console.log("Vehicle found:", vehicle);
    
    const { pickupLocation, dropLocation, weight } = req.body;
    if (!pickupLocation || !dropLocation || !weight) {
      return res.status(400).json({ error: "Please fill all details!!!" });
    }

    const calculatedDistance = await getDistance(pickupLocation, dropLocation);
    console.log("Calculated distance:", calculatedDistance);

    const newBooking = await Booking.create({
      user: req.user._id,
      vehicle: vehicle._id,
      pickupLocation,
      dropLocation,
      distance: calculatedDistance.toFixed(2),
      totalBill: vehicle.rate * calculatedDistance.toFixed(2),
      weight,
      status: "pending",
      estimatedDeliveryTime: "1 day",
    });

    console.log("New booking created:", newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message });
  }
};



const getBooking = async(req,res)=>{
    const booking = await Booking.find({user:req.params.uid}).populate("vehicle")
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
    if(findBooking.status === "completed" || findBooking.status === "in-progress"){
        res.status(400)
        throw new Error("Booking not cancelled")
    }
    else{
    const cancel = await Booking.findByIdAndUpdate(req.params.bid, {status : "cancelled"}, {new : true})
    res.status(200).json(cancel)

    }
}
module.exports = {addBooking, getBooking,cancelBooking} 