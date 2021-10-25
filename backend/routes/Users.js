const express=require("express");
const router=express.Router();
const {Users} =require("../models");
const bcrypt= require("bcrypt"); //get hashing functions for encryption of password

router.post("/",async(req,res)=>{
    const {username, password}=req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        })
        res.json(" User addded");
    });
});

router.post("/login",async(req,res)=>{
    const {username, password}=req.body;
    const user= await Users.findOne({
        where: {
            username: username
        }
    });
    if(!user) res.json({error:"User Does not Exist"});

    bcrypt.compare(password,user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Username and Password Combination"});

        res.json("User Logged in");
    });
});


module.exports=router;