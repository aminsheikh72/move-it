const express = require("express")
const { addBooking, getBooking, cancelBooking } = require("../controllers/bookingController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()
router.post('/:uid', protect  ,addBooking)
router.get('/:bid', protect  ,getBooking)
router.get('/:bid', protect  ,getBooking)
router.put('/:bid', protect  ,cancelBooking)


module.exports = router