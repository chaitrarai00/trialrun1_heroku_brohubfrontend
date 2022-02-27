import React,{useEffect, useState, useContext} from 'react'
import {useParams, useHistory } from "react-router-dom"
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext'

function Post() {
    let {id}=useParams(); //used to retrive the parameter in the url
    //state actually help in retrieving or getting values from the frontend basically holding the state
    const [postObject, setPostObject] =useState({});
    const [comments, setComments]= useState([]);
    const [newComment, setNewComment]=useState("");
    const {authState}=useContext(AuthContext);// grabbing the context from AuthContext

    let history= useHistory();

    useEffect(
        ()=>{
            axios.get(`https://deployment-trail-run.herokuapp.com/posts/byId/${id}`).then((response)=>{
                //what to do?
                setPostObject(response.data);
            });

            axios.get(`https://deployment-trail-run.herokuapp.com/comments/${id}`).then((response)=>{
                setComments(response.data);
            });
        },[]);
        //we add a [] here to avoid multiple calls to api and avoid the aw!snap once website breaks with multiple api calls
        //this way the useEffect will understant that there is no change in the state

    const addComment= ()=>{
        // we get id in the url, the post id
        axios.post("https://deployment-trail-run.herokuapp.com/comments", 
        { commentBody :newComment ,
            PostId: id},
            {
                headers:{
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response)=>{
                // if there was any issue while commenting
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                // add username so that its grabbed on rendering on response from route
                const commentToAdd= {commentBody: newComment, username: response.data.username};
                setComments([...comments, commentToAdd]);//array destructuring and adding new added comment/ element into old value
                setNewComment(""); //clearing the current value and resetting the input for next time
            }
        }
        )
    }

    //function to delte comment
    const deleteComment=(id)=>{
        axios.delete(`https://deployment-trail-run.herokuapp.com/comments/${id}`,{
            headers:{
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then(()=>{
            setComments(comments.filter((val)=>{
                return val.id != id;
            })
            );
        });
    };

    // const deletePost= (id)=>{
    //     axios.delete(`https://deployment-trail-run.herokuapp.com/posts/${id}`,{
    //         headers: {accessToken: localStorage.getItem("accessToken")},
    //     }).then(()=>{
    //         history.push("/");
    //     })
    // };
    const deletePost = (id) => {
        axios
          .delete(`https://deployment-trail-run.herokuapp.com/posts/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then(() => {
            history.push("/");
          });
      };

      const editPost= (option) => {
          if(option === "title"){
              let newTitle= prompt("Enter New Title:");
              axios.put("https://deployment-trail-run.herokuapp.com/posts/title",
                  {newTitle: newTitle, id: id},
                  { headers: {accessToken: localStorage.getItem("accessToken") },}
              );
              setPostObject({...postObject, title: newTitle});// change onlt title keeping other postObject values as before
          }else{
              let newPostText= prompt("Enter New Text");
              axios.put("https://deployment-trail-run.herokuapp.com/posts/postText",
                  {newPostText: newPostText, id: id},
                  { headers: {accessToken: localStorage.getItem("accessToken") },}
              );
              setPostObject({...postObject, postText: newPostText});
          }
      };

        //comments might not need formik as validations to comments isnt needed People can comment anything-->
        //on adding a comment we will have to be notified about the addition to reflect the changes so use event
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"
                    onClick={() => {
                        if(authState.username === postObject.username){
                            editPost("title");
                        }
                    }}>{postObject.title}</div>
                    <div className="body"
                    onClick={() => {
                        if(authState.username === postObject.username){
                            editPost("body")
                        }
                    }}>{postObject.postText}</div>
                    <div className="username">
                        {postObject.username}
                        {authState.username === postObject.username &&(
                            <button 
                            onClick={() => {
                                deletePost(postObject.id)
                            }}
                            > Delete Post</button>
                        )}
                    </div>
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
                        return(<div key={key} className="comment">{comment.commentBody}
                        <label> By User, {comment.username}</label>
                        {authState.username===comment.username && <button onClick={()=>{deleteComment(comment.id)}}> x </button>}
                        </div>
                        );
                    })}</div>
                </div>
            </div>
        </div>
    );
  

}

export default Post