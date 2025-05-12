const express = require("express")
const { getVehicles, getVehicle } = require("../controllers/vehicleControllers")
const router = express.Router()
router.get('/',getVehicles)
router.get('/:id',getVehicle)
module.exports = router