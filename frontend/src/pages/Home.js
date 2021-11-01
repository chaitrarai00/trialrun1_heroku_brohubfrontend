import React from 'react'         //rfce
import {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Home(){
    const [list_OfPosts, set_listOfPosts]= useState([]);
    const [likedPosts, set_LikedPosts]= useState([]);
    let history= useHistory();

    //function to retuern all posts
    useEffect( ()=>{
    axios.get("http://localhost:3001/posts", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
      set_listOfPosts(response.data.listOfPosts);
      set_LikedPosts(response.data.likedPosts.map((like)=>{
        return like.PostId;
      }));
    })
  },[]);

  //function to return all likes
  const likeAPost =(postId) => {
    axios.post("http://localhost:3001/likes", 
    {PostId: postId},
    {headers: {accessToken: localStorage.getItem("accessToken")}}
    ).then((response)=>{
      set_listOfPosts(list_OfPosts.map((post)=>{
        if(post.id===postId){// the post is the right post
          if(response.data.liked){
            // a responsive way of incresing the like array
            return { ...post, Likes: [...post.Likes, 0]};
          }else{
          const likesArray= post.Likes;
          likesArray.pop();
          return { ...post, Likes: likesArray};
        }}
        else{
          return post;
        }
      })
    )
    //make liking responsive
    if(likedPosts.includes(postId)){
      set_LikedPosts(likedPosts.filter((id)=>{
        return id!=postId;
      })
    );
    }else{
      //add the post to liked post
      set_LikedPosts([...likedPosts,postId]);
    }
    });
  };

    return(
        <div>
        {list_OfPosts.map((value,key)=>{  //relate with java maps
        //on click to the div below push to history
        return ( 
        <div key={key} className="post"> 
        <div className="title"> {value.title} </div> 
        <div className="body"  onClick={
          () => {history.push(`/post/${value.id}`);
        }}> {value.postText} </div>
        <div className="footer">
        <div className="username"> {value.username}</div> 
        <div className="buttons"><ThumbUpAltIcon onClick={
          ()=>{
          likeAPost(value.id);}} 
          className={likedPosts.includes(value.id)? "unlikeBttn" : "likeBttn"}
          />
          <label>{value.Likes.length}</label>
          </div>
        </div>
      </div>
        );
      })}
    </div> 
    )
}

export default Home