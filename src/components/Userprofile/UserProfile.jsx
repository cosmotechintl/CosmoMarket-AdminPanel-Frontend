import React, { useState } from 'react'
import "./UserProfile.scss";
import { MdGroups2 } from "react-icons/md";
import { FaEnvelope,FaPhoneAlt  } from "react-icons/fa";
import { FaEye,FaEyeSlash  } from "react-icons/fa";
const UserProfile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const maskContent = (content) => {
        return isVisible ? content : content.replace(/./g, '*');
    };
  return (
    <div className="userProfileContainer">
        <div className="userProfileContents">
            <div className="header">
                <span>My Profile</span>
                <span onClick={toggleVisibility} className="visibilityToggle">
                    {isVisible ? <FaEye title="Hide Sensitive Data" /> : <FaEyeSlash title="View Sensitive Data" />}
                </span>
            </div>
            <div className="body">
                <div className="left">
                    <div className="profileImgContainer">
                    <img 
                        src="https://www.w3schools.com/howto/img_avatar.png" 
                        alt="profile" 
                        className='profileImg' 
                    />
                    </div>
                    <div className="userDetailsContainer">
                        <span className="fullName">Super Admin</span>
                        <span className="username">{maskContent('@superadmin')}</span>
                        <span className="status">ACTIVE</span>
                        <span className="accessGroup">
                            <span className="icon"><MdGroups2/></span>
                            <span className="groupName">Super Admin</span>
                        </span>
                    </div>
                </div>
                <div className="right">
                    <div className="headerRight">Contact</div>
                    <div className="emailContainer">
                        <span className="icon"><FaEnvelope/></span>
                        <span className="email">{maskContent('superadmin@cosmomarket.com')}</span>
                    </div>
                    <div className="phoneContainer">
                        <span className="icon"><FaPhoneAlt/></span>
                        <span className="phone">{maskContent('+977-98045-00234')}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile