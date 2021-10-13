import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"
import axios from "axios"

function CreatePost(){
    /*
    object for initial Values
    */
    const initialValues={
        title: "",
        postText: "",
        username:"",
    };
   /**
    * Validation constraints for provided inputs
    */
   const validationSchema= Yup.object().shape({
       title: Yup.string().required("You must input a Text"),
       postText: Yup.string().required(),
       username: Yup.string().min(3).max(15).required(),
   })
    /*
    *function to exexute on submittion
    */
   const onSubmit=(data)=>{
       axios.post("http://localhost:3001/posts",data)
       .then((response)=>{
           console.log("Data Added")
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
                autocomplete="off"
                id="inputCreatePost"
                name="title"
                placeholder="insert your title here" />
        
                <label>Post Text:</label>
                <ErrorMessage name="postText" component="h4"/>
                <Field
                autocomplete="off"
                id="inputCreatePost" 
                name="postText"
                placeholder="insert your text here" />
        
                <label>username:</label>
                <ErrorMessage name="username" component="h4"/>
                <Field id="inputCreatePost" 
                name="username"
                placeholder="insert your username here" />
        
            <button type="submit">Create a post</button>
            </Form>
            </Formik>
        </div>
    )
}

export default CreatePost