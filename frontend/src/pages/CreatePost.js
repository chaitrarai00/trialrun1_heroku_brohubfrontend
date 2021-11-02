import React, {useContext, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext';

function CreatePost(){
    const {authState}=useContext(AuthContext);
    let history=useHistory();
    /*
    object for initial Values
    */
    const initialValues={
        title: "",
        postText: "",
    };

    //useEffect for checking or redirecting users not registered to login page
    useEffect(() =>{
        if(!localStorage.getItem("accessToken")){
            history.push("/login");
        }
    },[]);
   /**
    * Validation constraints for provided inputs
    */ 
   const validationSchema= Yup.object().shape({
       title: Yup.string().required("You must input a Text"),
       postText: Yup.string().required(),
   })
    /*
    *function to exexute on submittion
    */
   const onSubmit=(data)=>{
       axios.post("http://localhost:3001/posts",data, {headers:{accessToken: localStorage.getItem("accessToken")}})
       // grab username from localstroage access token and use that to be sored in database rather than take the input
       .then((response)=>{
           history.push("/")
       });
   };

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form className="formContainer">
                <label>Title:</label>
                <ErrorMessage name="title" component="h4"/>
                <Field
                autoComplete="off"
                id="inputCreatePost"
                name="title"
                placeholder="insert your title here" />
        
                <label>Post Text:</label>
                <ErrorMessage name="postText" component="h4"/>
                <Field
                autoComplete="off"
                id="inputCreatePost" 
                name="postText"
                placeholder="insert your text here" />
         
            <button type="submit">Create a post</button>
            </Form>
            </Formik>
        </div>
    )
}

export default CreatePost