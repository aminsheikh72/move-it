const express = require("express")
const { addVehicle, updateVehicle, removeVehicle, getAllBookings, getAllUsers, getAllVehicles, updateBooking } = require("../controllers/adminController")
const adminProtect = require("../middleware/adminMiddleware")
const router = express.Router()
router.post('/add-vehicle',adminProtect,addVehicle)
router.put('/update-vehicle/:id',adminProtect,updateVehicle)
router.delete('/remove-vehicle/:id',adminProtect,removeVehicle)
router.get('/get-bookings',adminProtect,getAllBookings)
router.get('/get-users',adminProtect,getAllUsers)
router.get('/get-vehicles',adminProtect,getAllVehicles)
router.put('/booking/:bid',adminProtect,updateBooking)




module.exports = router
