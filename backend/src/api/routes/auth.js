const router = require("express").Router();
const User= require("../models/User");
const bcrypt = require("bcrypt");
//register
router.post("/register", async(req,res)=>{

    try{
        //generate hashed pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        //generate new user
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });
        //save user and return response
        const user= await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err) 
    }
})

//login
router.post("/login",async(req,res)=>{
    try {
        /*const user= await User.findOne({email:req.body.email});
        if(!user){res.status(404)}
        
        const validPassword= await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {res.status(400)}
        
        res.status(200).json(user);*/

        const email = req.body.email
    const password = req.body.password

    //find user exist or not
    User.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return new Error("no user found")

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    return res.status(200).json(user)
                } else {
                    return new Error("wrong password");
                }

            })

        })
    
    } catch (error) {
        res.status(500).json(error) 
    }
})

module.exports= router;