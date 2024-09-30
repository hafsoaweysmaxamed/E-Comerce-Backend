const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    
    Title:{
        type:String,
        require:true
    },
    describtion:{
        type:String,
        require:true

    },
    image:{
        type: String,
        require:true


    },
    price:{
        type: Number,
        require: true
    }

})

module.exports=mongoose.model("Product",ProductSchema)


