const express = require("express")
const { addBooking, getBooking, cancelBooking } = require("../controllers/bookingController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()
router.post('/:vid', protect  ,addBooking)
router.get('/:uid', protect  ,getBooking)
router.put('/:bid', protect  ,cancelBooking)
router.use('/:bid/comments', protect, require("./commentRoute"))



module.exports = router