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
  "https://move-it-aminsheikh72s-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


// ✅ Parse incoming JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to Move It app 🚛",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", adminProtect, require("./routes/adminRoute"));
app.use("/api/vehicle", require("./routes/vehicleRoutes"));
app.use("/api/booking", protect, require("./routes/bookingRoute"));

// ✅ Error Handler
app.use(errorHandlere);

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 SERVER RUNNING AT PORT: ${PORT}`.bgGreen.white)
);
