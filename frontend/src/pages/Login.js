import React,{useState, useContext} from 'react'
import axios from 'axios';
import {useHistory} from "react-router-dom"
import {AuthContext} from '../helpers/AuthContext'

function Login() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const {setAuthState}=useContext(AuthContext);// grabbing the context from AuthContext

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
            //localStorage stores user token once logged in rather than wanting it to change each time when opening in new tab
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({username: response.data.username, id:response.data.id, status: true});
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
