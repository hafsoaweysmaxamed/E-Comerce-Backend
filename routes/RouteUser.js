const express = require("express")
const router= express.Router()

const UserModel = require ("../model/UserSchema")

router.post("/create/user",async (req,res)=>{
    const newUser = UserModel(req.body)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("user has been registered")
    }
})

router.get("/create/read", async (req,res)=>{
    const SavedUser = await UserModel.find()
    if(SavedUser){
        res.send(SavedUser)
    }
})
router.put("/create/update/:id",async(req,res)=>{
    const updated= await UserModel.updateOne(
        {_id:req.params.id},
        {$set:req.body}, 
    )
    if(updated){
        res.send("user has been updated")

    }
})
router.delete("/create/delete/:id",async(req,res)=>{
    const deleted= await UserModel.deleteOne(
        {_id:req.params.id}
    )
    if(deleted){
        res.send("user has been deleted")

    }
})
router.post("/create/login", async (req, res) => {
    const user= await UserModel.findOne(req.body).select("-password")
    if(req.body.email && req.body.password){

        if(user){
            res.send(user)
        }
        else{
            res.send({error:"incorrect email or password"})
        }
        
    } 
    else{
        res.send("fadlan soo geli email iyo password")
    }

})

module.exports=router
