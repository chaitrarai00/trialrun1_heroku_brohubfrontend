const express=require("express");
const router=express.Router();
const {Users} =require("../models");
const bcrypt= require("bcrypt"); //get hashing functions for encryption of password
const {validateToken} = require('../middlewares/AuthMiddleware');
const {sign,}=require('jsonwebtoken');

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

        //all conditions passed then generate the token
        //instead of "importantsecret" try to use random string generator
        const accessToken=sign({username: user.username, id: user.id},
            "importantsecret");
        //access to above token to the frontend for session storage
        res.json(accessToken);
    });
});

//below we check to see if the added token is valid or invalid
router.get('/auth', validateToken, (req,res)=>{
    res.json(req.user);
});

module.exports=router;