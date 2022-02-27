import React,{ useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext'

// This page is to create the profile page
function Profile() {

    let {id} =useParams(); //grab the id from the url
    let history= useHistory();
    const [username, setUsername] =useState("");
    const [listOfPosts, setListOfPosts] =useState([]);
    const {authState}=useContext(AuthContext);// grabbing the context from AuthContext


    //useEffect will be run once when the page is loaded..only once
    useEffect(()=>{
        axios.get(`https://deployment-trail-run.herokuapp.com/auth/basicinfo/${id}`)
        .then((response)=>{
            setUsername(response.data.username);// response from url has the basicinfo data
        });

        //another request for list of posts
        axios.get(`https://deployment-trail-run.herokuapp.com/posts/byuserid/${id}`)
        .then((response)=>{
            setListOfPosts(response.data);
        });
    },[]);
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1> Username: {username} </h1>
                {authState.username===username && (
                    <button onClick ={() => history.push("/changepassword")}> Change My Password </button>
                )}
                </div>
            <div className="listOfPosts">
                {listOfPosts.map((value,key)=>{  //relate with java maps
                return ( 
            <div key={key} className="post"> 
            <div className="title"> {value.title} </div> 
            <div className="body"  onClick={
            () => {history.push(`/post/${value.id}`);
            }}> {value.postText} </div>
            <div className="username">
            <div className="username"> {value.username}</div> 
            <div className="buttons">
          <label>{value.Likes.length}</label>
          </div>
        </div>
      </div>
        );
      })}</div>
        </div>
    );
}

export default Profile
