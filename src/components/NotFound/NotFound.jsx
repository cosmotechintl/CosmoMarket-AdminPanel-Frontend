import React from 'react'
import "./NotFound.scss"
import { MdErrorOutline } from "react-icons/md";
const NotFound = () => {
  return (
    <div className='notFoundContainer'>
        <div className="notFoundContents">
            <div className="notFoundIconContainer">
                <MdErrorOutline className='notFoundIcon'/>
            </div>
            <div className="notFoundText">Something went wrong on server, please wait or reload the page.</div>
        </div>
    </div>
  )
}

export default NotFound