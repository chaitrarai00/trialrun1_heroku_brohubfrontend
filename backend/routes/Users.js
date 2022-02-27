const express=require("express");
const router=express.Router();
const {Users} =require("../models");
const bcryptjs= require("bcryptjs"); //get hashing functions for encryption of password
const {validateToken} = require('../middlewares/AuthMiddleware');
const {sign,}=require('jsonwebtoken');

router.post("/",async(req,res)=>{
    const {username, password}=req.body;
    bcryptjs.hash(password, 10).then((hash)=>{
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

    bcryptjs.compare(password,user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Username and Password Combination"});

        //all conditions passed then generate the token
        //instead of "importantsecret" try to use random string generator
        const accessToken=sign({username: user.username, id: user.id},
            "importantsecret");
        //access to above token to the frontend for session storage
        res.json({token: accessToken, username: username, id: user.id});
    });
});

//below we check to see if the added token is valid or invalid
//only authenticated user gets in
router.get('/auth', validateToken, (req,res)=>{
    res.json(req.user);
});

// we will use this route to grab username for the Profile page
// no validate token since anyone can view the profile page
router.get("/basicinfo/:id", async(req,res) => {
    const id= req.params.id;
    //get user info using id but filter out password
    const basicInfo= await Users.findByPk(id, {
        attributes: {exclude: ["password"]}
    });
    res.json(basicInfo); 
});

//update password route
router.put('/changepassword', validateToken ,async(req, res)=>{
    const {oldPassword, newPassword}=req.body;
    const user=  Users.findOne({
        where: {
            username: req.user.username
        }
    });// get user from validate token

    bcryptjs.compare(oldPassword,user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Password"});

        bcryptjs.hash(newPassword, 10).then((hash)=>{
                 Users.update({password: hash}, {where:{
                    username: req.user.username
                }});
                res.json(" Password change successfull");
            });
    });
});

module.exports=router;