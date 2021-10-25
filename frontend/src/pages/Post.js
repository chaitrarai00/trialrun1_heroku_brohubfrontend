import React,{useEffect, useState} from 'react'
import {useParams } from "react-router-dom"
import axios from 'axios';

function Post() {
    let {id}=useParams(); //used to retrive the parameter in the url
    //state actually help in retrieving or getting values from the frontend basically holding the state
    const [postObject, setPostObject] =useState({});
    const [comments, setComments]= useState([]);
    const [newComment, setNewComment]=useState("");

    useEffect(
        ()=>{
            axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
                //what to do?
                setPostObject(response.data);
            });

            axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
                setComments(response.data);
            });
        },[]);
        //we add a [] here to avoid multiple calls to api and avoid the aw!snap once website breaks with multiple api calls
        //this way the useEffect will understant that there is no change in the state

    const addComment= ()=>{
        // we get id in the url, the post id
        axios.post("http://localhost:3001/comments", 
        { commentBody :newComment ,
            PostId: id},
            {
                headers:{
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            })
            .then((response)=>{
                // if there was any issue while commenting
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                const commentToAdd= {commentBody: newComment};
                setComments([...comments, commentToAdd]);//array destructuring and adding new added comment/ element into old value
                setNewComment(""); //clearing the current value and resetting the input for next time
            }
        }
        )
    }
        //comments might not need formik as validations to comments isnt needed People can comment anything-->
        //on adding a comment we will have to be notified about the addition to reflect the changes so use event
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="username">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    
                    <input 
                    type="text" 
                    value={newComment}
                    placeholder ="Comment.." 
                    autoComplete="off" 
                    onChange={ (event) => {setNewComment(event.target.value)}}
                    />
                    <button onClick={addComment}>Add Your Comment</button>
                </div>
                <div className="listOfComments">
                    <div>{comments.map((comment, key)=>{
                        return(<div key={key} className="comment">{comment.commentBody}</div>
                        );
                    })}</div>
                </div>
            </div>
        </div>
    );
  

}

export default Post