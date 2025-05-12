const { mongoose } = require("mongoose");

const bookingSchema= new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    vehicle : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : "Vehicle",
        require  : true
    },
    pickupLocation : {
        type : String,
        require : true
    },
    dropLocation : {
         type : String,
        require : true
    },
    distance : {
         type : Number,
        require : true
    },
    estimatedDeliveryTime : {
         type : String,
        require : true
    },
    totalBill  : {
         type : Number,
        require : true
    },
    status : {
         type : String,
         enum : ["pending","compeleted","cancelled","accepted"],
         default  : "pending",
        require : true,
    },
    weight : {
         type : Number,
        require : true
    }


},{
    timestamps: true
})
module.exports = mongoose.model("Booking",bookingSchema)