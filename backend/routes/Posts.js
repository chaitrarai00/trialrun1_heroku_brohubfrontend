const express=require("express");
const router=express.Router();
const {Posts,Likes} =require("../models");
const {validateToken}= require("../middlewares/AuthMiddleware");

router.get("/", validateToken ,async (req , res) => {
//when we get the post we must include the like table ; join/include with the post table and hence that would have the array of likes 
    const listOfPosts = await Posts.findAll({include: [Likes]});
//another query to include liked posts of the user logged in for this req
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id} });
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});


router.post("/" ,validateToken ,async (req, res) => { //use validateToken to get the logged in username
    const post=req.body;
    post.username = req.user.username;
    post.UserId= req.user.id;// this is tsored and retrieve from jwt
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

//router to delete a post
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where:{
            id: postId,
        },
    });
    res.json("DELETED SUCCESSFULLY") //not including this will not complete the promise
});

//router get all list of posts of a user
router.get("/byuserId/:id",async(req, res)=>{
    //parameter from request req.params.id
    const id=req.params.id;
    const listOfPosts=await Posts.findAll({
        where: { UserId: id},
        include: [Likes],
    });
    res.json(listOfPosts);
});

//edit posts/ update 
router.put("/title", validateToken, async (req, res) => {
    const { newTitle, id} = req.body;
    await Posts.update(
        {title: newTitle}, { 
        where: {id: id}
    });
    res.json(newTitle);
});


router.put("/postText", validateToken, async (req, res) => {
    const { newText, id} = req.body;
    await Posts.update(
        {title: newText}, { 
        where: {id: id}
    });
    res.json(newText);
});

module.exports=router;