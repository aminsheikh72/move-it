const express = require("express")
const { addBooking, getBooking, cancelBooking } = require("../controllers/bookingController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()
router.post('/:vehicleId', protect  ,addBooking)
router.get('/:userId', protect  ,getBooking)
router.put('/:bid', protect  ,cancelBooking)
router.use("/:bookingId/comment", require("./commentRoute"))




module.exports = router