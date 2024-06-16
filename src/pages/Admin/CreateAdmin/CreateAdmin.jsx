import React, { useEffect, useState } from 'react';
import "./CreateAdmin.scss";
import CustomForm from '../../../components/CustomForm/CustomForm';
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import { BASE_URL } from '../../../utils/config';
import { toast, Toaster } from "react-hot-toast";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    email: '',
    accessGroup: '',
  });
  const [accessGroups, setAccessGroups] = useState([]);

  useEffect(() => {
    const fetchAccessGroups = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
          firstRow: 0,
          pageSize: 0
        });
        setAccessGroups(response.data.data.records);
        updateAuthToken();
      } catch (error) {
        toast.error(error.message || "Failed to fetch access groups");
      }
    };
    fetchAccessGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await adminRequest.post(`${BASE_URL}/adminUser/create`, {
        name: formData.fullName,
        mobileNumber: formData.mobileNumber,
        address: formData.address,
        email: formData.email,
        accessGroup: {
          name: formData.accessGroup
        }
      });
      if (response.data.code == 0) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', value: formData.fullName, onChange: handleChange },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'text', value: formData.mobileNumber, onChange: handleChange },
    { name: 'address', label: 'Address', type: 'text', value: formData.address, onChange: handleChange },
    { name: 'email', label: 'Email (Username)', type: 'email', value: formData.email, onChange: handleChange, tail: 'Activation links will be sent to this email.' },
    { 
      name: 'accessGroup', 
      label: 'Access Group', 
      type: 'select', 
      value: formData.accessGroup, 
      onChange: handleChange,
      options: accessGroups.map(group => ({ label: group.name, value: group.name })) 
    },
  ];

  return (
    <div className='createAdminContainer'>
      <CustomForm 
        header="Create Admin User"
        fields={fields}
        flexDirection="row"
        createButtonLabel='Create User'
        onSubmit={handleSubmit}
      />
      <Toaster />
    </div>
  );
}

export default CreateAdmin;
