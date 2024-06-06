import React from 'react';
import "./CustomForm.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const CustomForm = ({ header = "Default Header", fields = [],flexDirection="column" }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="createPageContainer">
      <div className="createPageContents">
        <div className="top">
          <span className="backIcon" onClick={handleBackClick}><FaArrowLeftLong /></span>
          <span className="headerTitle">{header}</span>
        </div>
        <div className="bottom" >
          <form style={{ flexDirection: flexDirection }}>
            {fields.map((field, index) => (
              <div className="inputGroup" key={index}>
                <label htmlFor={field.name}>{field.name}</label>
                {field.type === 'select' ? (
                  <select name={field.name} id={field.name}>
                    {field.options.map((option, index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea name={field.name} id={field.name} />
                ) : (
                  <input type={field.type} name={field.name} id={field.name} />
                )}
              </div>
            ))}
          </form>
          <div className="btn-group">
            <button type="submit" className='create-btn'>Create</button>
            <button className="cancel-btn" onClick={handleBackClick}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomForm;