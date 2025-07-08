const express = require("express")
require("dotenv").config()
const colors = require('colors')
const connectDB = require("./config/dbConfig")
const errorHandlere = require("./middleware/errorHandler")
const adminProtect = require("./middleware/adminMiddleware")
const protect = require("./middleware/authMiddleware")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

// connect db
connectDB()


const allowedOrigins = [
  "http://localhost:5173",
  "https://move-it-aminsheikh72s-projects.vercel.app" // replace with your real domain
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


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