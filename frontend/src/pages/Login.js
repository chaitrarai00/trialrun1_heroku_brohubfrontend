import React,{useState} from 'react'
import axios from 'axios';
import {useHistory} from "react-router-dom"

function Login() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");

    let history= useHistory();

    const login=()=>{
        //we grab this from the states
        const data={username: username, password: password}
        axios.post("http://localhost:3001/auth/login", data).then((response)=>{
            if(response.data.error){
                 alert(response.data.error);
            }
            //if all goes well store it in the session
            else{
            sessionStorage.setItem("accessToken", response.data);
            history.push("/");
        }
        });
    };
    return (
        <div className="loginContainer">
            <input type="text" 
            onChange={(event)=>{
                setUsername(event.target.value);
            }}/>
            <input type="password" 
            onChange={(event)=>{
                setPassword(event.target.value);
            }}/>

            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
