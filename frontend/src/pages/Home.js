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
    return(
        <div>
        {list_OfPosts.map((value,key)=>{  //relate with java maps
        //on click to the div below push to history
        return (
        <div className="post" onClick={
          () => {history.push(`/post/${value.id}`);
        }}> 
        <div className="title"> {value.title} </div> 
        <div className="body"> {value.postText} </div>
        <div className="username"> {value.username} </div>
        </div>
        );
      })}
        </div>
    )
}

export default Home