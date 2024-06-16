import React, { useState, useEffect } from 'react';
import "./CreateAccessGroup.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from '../../../utils/config';
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';

const CreateAcessGroup = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { data, error, loading } = useFetch(`${BASE_URL}/roles`, adminRequest);
  console.log(data);
  updateAuthToken();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <div className="createAccessGroupContainer">
      <div className="createAccessGroupContents">
        <div className="accessGroupTop">
          <span className="accessGroupBackIcon" onClick={handleBackClick}><FaArrowLeftLong /></span>
          <span className="accessGroupHeaderTitle">Create Access Group</span>
        </div>
        <div className="accessGroupBottom">
          {loading && <p>Loading...</p>}
          {!loading && !data && !data.data && <p>Data does not exist.</p>}
          {data.data && (
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="inputGroup">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>Select type</option>
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
              <div className="rolesContainer">
                {/* {data.data.map((item) => (
                  <div key={item.id} className="roleGroup">
                    <div className="parentRole">
                      <input
                        className="parentRole__checkbox"
                        type="checkbox"
                        id={item.id}
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    {item.childRoles && item.childRoles.length > 0 && (
                      <div className="childRoles">
                        {item.childRoles.map((childRole) => (
                          <div key={childRole.id} className="childRole">
                            <input
                              type="checkbox"
                              id={childRole.id}
                            />
                            <label htmlFor={childRole.id}>{childRole.name}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))} */}
              </div>
              <div className="btn-group">
                <button type="submit" className='create-btn'>Create Access Group</button>
                <button type="button" className="cancel-btn" onClick={handleBackClick}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAcessGroup;
