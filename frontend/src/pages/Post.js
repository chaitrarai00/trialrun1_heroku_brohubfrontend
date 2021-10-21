import React,{useEffect, useState} from 'react'
import {useParams } from "react-router-dom"
import axios from 'axios';

function Post() {
    let {id}=useParams(); //used to retrive the parameter in the url
    const [postObject, setPostObject] =useState({});

    useEffect(
        ()=>{
            axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
                //what to do?
                setPostObject(response.data);
            });
        });
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="username">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">Comments</div>
        </div>
    );
}

export default Post