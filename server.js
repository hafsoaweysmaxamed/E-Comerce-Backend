const express = require("express")
const multer=require("multer")
const cors = require("cors")
const RouteProduct = require ("./routes/RouteProduct")

const userRoute = require("./routes/RouteUser")

const app = express()
app.use(express.json())
app.use(cors())
app.use(RouteProduct)
app.use(userRoute)


const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eSuuq").then(()=>{
    console.log("database has been connected successfully")
}).catch((error)=>{
    console.log(error)
})

// multer file name
const imageLocation = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"images")
    },
    filename:(req,file, cb)=>{
       cb(null,file.originalname) 
        
    }
})
const uploadImage= multer({
    storage:imageLocation
})
const ProductModel = require ("./model/commerceSchema")

app.post("/product/create", uploadImage.single('image') ,async (req,res)=>{
    const newProduct = ProductModel ({
        Title:req.body.title,
        describtion:req.body.describtion,
        price:req.body.price,
        image:req.file.filename

    })
    const saveProduct=await newProduct.save()
    if(saveProduct){
        res.send("data has been registered")
    }

})
// Api displays All
app.get("/products",async (req,res)=>{
    const Allproducts=await ProductModel.find()
    if(Allproducts){
        res.send(Allproducts)
    }
})


app.delete("/products/delete/:id", async (req,res)=>{
    const deleted = await ProductModel.deleteOne(
        {_id:req.params.id}
    )
    if(deleted){
        res.send("product has been deleted successfully")
    }
})
app.use("/images",express.static("images"))

app.put("/products/update/:id",async (req,res)=>{
    const updated = await ProductModel.updateOne(
        {_id: req.params.id},
        {$set:req.body}
    )
    if(updated){
        res.send("product has been updated")
    }
})
app.get("/product/single/:id", async (req,res)=>{
    const getSingleData = await ProductModel.find({_id:req.params.id})

    if(getSingleData){
        res.send(getSingleData)
    }
})


app.listen(1000,()=>{
    console.log("server running port 1000")
})