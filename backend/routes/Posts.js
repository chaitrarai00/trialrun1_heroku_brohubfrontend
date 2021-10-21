const express=require("express");
const router=express.Router();
const {Posts} =require("../models");

router.get("/",async (req , res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post("/",async (req, res) => {
    const post=req.body;
    await Posts.create(post);
    res.json(post); //cannot be parsed in express
});

//declare a new url for returning a post based on id : create a route
router.get("/byId/:id",async(req, res)=>{
    //parameter from request req.params.id
    const id=req.params.id;
    const post=await Posts.findByPk(id);
    res.json(post);
});

module.exports=router;