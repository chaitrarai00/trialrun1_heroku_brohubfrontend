const express=require("express");
const router=express.Router();
const {Comments} =require("../models");

//declare a new url for returning a post based on id : create a route
router.get("/:postId",async(req, res)=>{
    //parameter from request req.params.id
    const postId=req.params.postId;
    const comments=await Comments.findAll({
        where:{
            PostId: postId
        }
    });
    res.json(comments);
});

//post a comment
router.post("/",async(req, res)=>{
    const comment= req.body;
    await Comments.create(comment);
    res.json(comment);
});


module.exports=router;