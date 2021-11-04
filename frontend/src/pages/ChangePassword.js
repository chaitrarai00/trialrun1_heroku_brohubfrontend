import React, {useState} from 'react';
import axios from 'axios';

function ChangePassword() {
    const [oldPassword, setOldPassword]=useState("");
    const [newPassword, setNewPassword]=useState("");


    const changePassword=()=>{
        axios.put("hhttp://localhost:3001/auth/changepassword",
        {oldPassword: oldPassword, newPassword: newPassword},
        { headers: {accessToken: localStorage.getItem("accessToken") },}
    ).then((response)=>{
        if(response.data.error){
            alert(response.data.error);
        }
    })};

    return (
        <div>
            <h1>Change Your Password</h1>
            <input type="text" placeholder="Old Password"
            onChange={(event) => {setOldPassword(event.target.value);
            }} />
            <input type="text" placeholder="New Password" 
            onChange={(event) => {setNewPassword(event.target.value);
            }} />
            {/* //add another input and try to validate if the enw password you repeat is the same */}
            <button>Save Changes</button>
        </div>
    )
}

export default ChangePassword
