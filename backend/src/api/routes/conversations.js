const router= require("express").Router();
const Conversation = require("../models/Conversation");

//new conv
router.post("/",async(req,res)=>{
    const newConversation= new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    })

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/:userId",async(req,res)=>{
    try {
        const coversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(coversation); 
    } catch (err) {
        res.status(500).json(err);
    }
})


//get conv of user

module.exports = router;