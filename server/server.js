const express = require("express")
require("dotenv").config()
const colors = require('colors')
const connectDB = require("./config/dbConfig")
const errorHandlere = require("./middleware/errorHandler")
const adminProtect = require("./middleware/adminMiddleware")
const protect = require("./middleware/authMiddleware")
const app = express()
const PORT = process.env.PORT || 5000

// connect db
connectDB()

app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.json({
        msg : "welcome to move it app"
    })
})
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/admin',adminProtect,require('./routes/adminRoute'))
app.use('/api/vehicle',require('./routes/vehicleRoutes'))
app.use('/api/booking',protect,require('./routes/bookingRoute'))

app.use(errorHandlere)
app.listen(PORT, ()=> console.log(`SERVER IS RUNNING AT PORT :${PORT}`.bgGreen.white)
)