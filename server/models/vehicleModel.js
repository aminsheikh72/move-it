const { default: mongoose } = require("mongoose");

const vehicleSchema= new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    rate:{
        type : Number,
        required : true
    },
    capacity:{
        type : Number ,
        required : true
    },
    image:{
        type : String,
        required : true
    },
    registration:{
        type : String,
        required : true,
        unique :  true
    },
    isAvailable:{
        type : String,
        enum : ["available","unavailable"],
        required : true
    },
},{
    timestamps : true
})
module.exports = mongoose.model("Vehicle",vehicleSchema)