const express=require("express");
const router=express.Router();
const {Comments} =require("../models");
const {validateToken}=require("../middlewares/AuthMiddleware");
//above token is to check and see which user has access to the comments

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

//post a comment or create a comment
//validate to see who has read write access for commenting
router.post("/",validateToken,async(req, res)=>{
    const comment= req.body;
    await Comments.create(comment);
    res.json(comment);
});


module.exports=router;