import React from 'react'         //rfce
import {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"

function Home(){
    const [list_OfPosts, set_listOfPosts]= useState([]);
    let history= useHistory();
    useEffect( ()=>{
    axios.get("http://localhost:3001/posts").then((response) =>{
      set_listOfPosts(response.data);
    })
  },[]);

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
      }))
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
        <div className="username"> {value.username} 
        <button onClick={()=>{
          likeAPost(value.id);
          }}
          > {" "}Like</button> 
          <label>{value.Likes.length}</label></div>
        </div>
        );
      })}
        </div>
    )
}

export default Home