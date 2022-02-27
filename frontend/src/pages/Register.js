import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom"

function Register() {
    const initialValues={
        username:"",
        password:"",
    };

    let history=useHistory();
   /**
    * Validation constraints for provided inputs
    */
   const validationSchema= Yup.object().shape({
      username: Yup.string().min(3).max(15).required(),
      password:Yup.string().min(4).max(20).required(),
   })
    /*
    *function to exexute on submittion
    */
    const onSubmit=(data)=>{
        axios.post("https://deployment-trail-run.herokuapp.com/auth", data).then(()=>{
            alert("User registered Successfully")
            history.push("/login");
        });
    };
    return (
        <div className="createPostPage">
          <Formik initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form className="formContainer">
            <label>username:</label>
            <ErrorMessage name="username" component="h4"/>
            <Field id="inputCreatePost" 
            name="username"
            placeholder="insert your username here" />

            <label>password:</label>
            <ErrorMessage name="password" component="h4"/>
            <Field id="inputCreatePost" 
            name="password"
            type="password"
            placeholder="insert your password here" />  
        <button type="submit">Register</button>
        </Form>
        </Formik>
    </div>
    )
}

export default Register
