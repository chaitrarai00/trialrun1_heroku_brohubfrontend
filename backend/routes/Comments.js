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
    const username= req.user.username;// grabbed from the middleware
    comment.username=username;
    await Comments.create(comment);
    res.json(comment);
});

//delete a comment
router.delete("/:commentId",validateToken,async(req,res)=>{
    const commentId=req.params.commentId;
    await Comments.destroy({
        where:{
            id: commentId,
        },
    });
    //sequelize to delete: destroy
    res.json("DELETED SUCCESSFULLY");//always include or send a response to make sure req is completed
});


module.exports=router;