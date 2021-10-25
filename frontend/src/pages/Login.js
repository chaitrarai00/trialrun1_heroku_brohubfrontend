import React,{useState} from 'react'
import axios from 'axios';

function Login() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");

    const login=()=>{
        //we grab this from the states
        const data={username: username, password: password}
        axios.post("http://localhost:3001/auth/login", data).then((response)=>{
            console.log(response.data);
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
