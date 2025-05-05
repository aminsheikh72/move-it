const { mongoose } = require("mongoose")

const connectDB = async()=>{
try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("server is connected".bgBlue.white);
    
} catch (error) {
    console.log("database is not connected".bgRed.white);
    
}    
}
module.exports = connectDB