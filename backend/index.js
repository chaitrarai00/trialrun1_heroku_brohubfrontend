const express=require("express");
const app=express();
const cors=require("cors");

app.use(express.json());//helps express parse json request
app.use(cors());//intoduce te middleware to whitelist the api from the server

const db = require('./models'); //access for every module in the backend using db

//router for posts
const postRouter=require("./routes/Posts");
app.use("/posts",postRouter);
//router for comments
const commentRouter=require("./routes/Comments");
app.use("/comments",commentRouter);
//router for user auth
const userRouter=require("./routes/Users");
app.use("/auth",userRouter);
//router for likes auth
const likesRouter=require("./routes/Likes");
app.use("/likes",likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001,
    ()=>{
        console.log("Server running on port 3001");
    });
});
//where the server should run
//, configure the port where the server is supposed to run
//make sure its not the prot where application has to run
