import React, { useState } from 'react'
import "./CreatePassword.scss"
import logo from "../../assets/logo-transparent.png"
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const CreatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const activeUuid = location.pathname.split("/")[2];
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${BASE_URL}/adminUser/setPassword`, {
                "uuid" :activeUuid,
                "password": newPassword,
                "confirmPassword": confirmPassword
            })
            if(response.data.code == 0){
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <div className='createPasswordContainer'>
            <div className="createPasswordContents">
                <div className="left">
                    <div className="createPasswordlogoContainer">
                        <img src={logo} alt="logo" className='logoContainerImg' />
                    </div>
                    <div className="headerText">Create Password</div>
                    <p className="descText">Welcome to the Cosmo Market Admin Panel! To secure your account, please create a new password below.</p>
                    <form className="passwordContainer" onSubmit={handleSubmit}>
                        <span className="passwordInput">
                            <label htmlFor="new-password" className='passwordLabel'>New Password</label>
                            <input type="password" name="newPassword" id="new-password" className='password-box' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </span>
                        <span className="passwordInput">
                            <label htmlFor="confirm-password" className='passwordLabel'>Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirm-password" className='password-box' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </span>
                        <span className="submit-btn">
                            <input type="submit" value="Create Password" className='submitBtn'/>
                        </span>
                    </form>
                </div>
                <div className="right">
                    <h2 className="rightHeader">Password Criterias</h2>
                    <span className="desc">Create a secure password using the following criterias</span>
                    <span className="criterias">
                        <ul>
                            <li>Password should must contain minimum 1 special character(s).</li>
                            <li>Password should must contain minimum 1 digit(s).</li>
                            <li>Password should must contain minimum 1 lowercase letter(s).</li>
                            <li>Password maximum length is 15.</li>
                            <li>Password minimum length is 8.</li>
                        </ul>
                    </span>
                </div>
            </div>
            <Toaster/>
        </div>
  )
}

export default CreatePassword
