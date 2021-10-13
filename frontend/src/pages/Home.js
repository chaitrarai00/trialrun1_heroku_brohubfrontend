import React from 'react'         //rfce
import {useEffect, useState} from "react";
import axios from "axios";

function Home(){
    const [list_OfPosts, set_listOfPosts]= useState([]);

    useEffect( ()=>{
    axios.get("http://localhost:3001/posts").then((response) =>{
      set_listOfPosts(response.data);
    })
  },[]);
    return(
        <div>
        {list_OfPosts.map((value,key)=>{  //relate with java maps
        return <div className="post"> 
        <div className="title"> {value.title} </div> 
        <div className="body"> {value.postText} </div>
        <div className="username"> {value.username} </div>
        </div>
      })}
        </div>
    )
}

export default Home