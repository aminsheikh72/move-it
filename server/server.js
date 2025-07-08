const express = require("express");
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/dbConfig");
const errorHandler = require("./middleware/errorHandler");
const adminProtect = require("./middleware/adminMiddleware");
const protect = require("./middleware/authMiddleware");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://move-it-aminsheikh72s-projects.vercel.app",
];

// ✅ CORS Middleware — Allow origin + credentials + preflight
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle Preflight Requests Globally (OPTIONS)
app.options("*", cors());

// ✅ Optional: Add CORS headers manually (fallback)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

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
app.use(errorHandler);

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 SERVER RUNNING AT PORT: ${PORT}`.bgGreen.white)
);
