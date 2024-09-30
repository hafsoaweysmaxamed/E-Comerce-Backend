const express = require("express")

const router = express.Router()
const OrderModel = require ("../model/OrderMode")

router.post("/order/create",async (req, res)=>{
    const newOrder = OrderModel(req.body)
    const saveOrder = await newOrder.save()
    if(saveOrder){
        res.send("order has been saved")
    }
})

// API that displays All orders
router.get("/orders",async (req,res)=>{
    const order= await OrderModel.find()
    if(order){
        res.send(order)
    }
})


router.delete("/order/delete/:id",async (req,res)=>{
    const deleted = await OrderModel.deleteOne(
        {_id:req.params.id}
    )
    
    if(deleted){
        res.send("order has been deleted")
    }
})
router.put("/order/update/:id",async (req,res)=>{
    const updated= await OrderModel.updateOne(
        {_id:req.params.id},
        {$set:req.body},
    )
    if(updated){
        res.send("order has been updated")
    }

})
module.exports = router