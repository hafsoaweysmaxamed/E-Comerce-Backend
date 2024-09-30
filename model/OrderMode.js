const mongoose= require("mongoose")

const OrderSchema =  mongoose.Schema({
    email:{
        type:String,
        require: true
    },
    quantity:{
        type: Number,
        require:true,
    },
    price:{
        type:Number,
        require:true
        
    },
    product:{
        type: [],
        require:true
    }


},
{timestamps:true}


)

module.exports = mongoose.model("Order",OrderSchema)
