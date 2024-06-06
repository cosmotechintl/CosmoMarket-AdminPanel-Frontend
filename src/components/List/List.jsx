import React from 'react';
import "./List.scss";
import { FaEye, FaEyeSlash, FaFilter } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
const List = ({
  title = "Default Title", 
  link = "/", 
  createButtonLabel = "Create Button", 
  headers = [], 
  rows = [],
  showEyeViewIcon = true,
  showFilterIcon = true 
}) => {
  const navigate = useNavigate();

  const handleCreateButtonClick = () => {
    navigate(link);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className='viewPageContainer'>
      <div className="viewPageContents">
        <div className="top">
          <span className="leftTitle">
            <FaArrowLeftLong onClick={handleBackClick} className='icon' />
            {title}
          </span>
          <span className="rightContents">
            {showEyeViewIcon && <span className="eyeViewIcon"><FaEyeSlash /></span>}
            {showFilterIcon && <span className="filterIcon"><FaFilter /></span>}
            <span className="createButton" onClick={handleCreateButtonClick}>
              <span className="title">{createButtonLabel}</span>
              <span className="addIcon"><IoIosAddCircle /></span>
            </span>
          </span>
        </div>
        <div className="bottom">
          <table className='listTable'>
            <thead>
              <tr className='tableHeaderRow'>
                <th></th>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td><IoIosMore /></td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
