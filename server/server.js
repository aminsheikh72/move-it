const express = require("express")
require("dotenv").config()
const colors = require('colors')
const connectDB = require("./config/dbConfig")
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

app.listen(PORT, ()=> console.log(`SERVER IS RUNNING AT PORT :${PORT}`.bgGreen.white)
)