const express = require("express")
const { getComments, addComments } = require("../controllers/commentController")
const protect = require("../middleware/authMiddleware")
const router = express.Router({mergeParams : true})
router.get('/',protect ,getComments)
router.post('/', protect ,addComments)

module.exports = router
