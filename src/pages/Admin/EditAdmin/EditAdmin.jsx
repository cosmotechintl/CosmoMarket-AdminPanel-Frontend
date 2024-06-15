import React, { useEffect, useState } from 'react';
import CustomForm from '../../../components/CustomForm/CustomForm';
import "./EditAdmin.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import { BASE_URL } from '../../../utils/config';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';

const EditAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeURL = location.pathname.split('/')[4];

    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        address: '',
        email: ''
    });
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await adminRequest.post(`${BASE_URL}/adminUser/get`, {
              "username": `${activeURL}`
            });
            setData(response.data);
            setFormData({
                fullName: response.data.data.name,
                mobileNumber: response.data.data.mobileNumber,
                address: response.data.data.address,
                email: response.data.data.email
            });
            console.log(response.data);
          } catch (error) {
            toast.error(error.message || "Failed to fetch data");
          }
        };
        fetchData();
    }, [activeURL]);

    updateAuthToken();

    if (!data || !data.data) {
        return <Loader />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminRequest.post(`${BASE_URL}/adminUser/edit`, {
                email: activeURL,
                name: formData.fullName,
                mobileNumber: formData.mobileNumber,
                address: formData.address,
                email: formData.email,
                accessGroup: {
                  name:'DEMO'
                }
            });
            toast.success(response.data.message);
            
        } catch (error) {
            toast.error(error.message || "Failed to update data");
        }
    };

    const fields = [
        { name: 'fullName', label: 'Full Name', type: 'text', value: formData.fullName, onChange: handleChange },
        { name: 'mobileNumber', label: 'Mobile Number', type: 'text', value: formData.mobileNumber, onChange: handleChange },
        { name: 'address', label: 'Address', type: 'text', value: formData.address, onChange: handleChange },
        { name: 'email', label: 'Email (Username)', type: 'email', value: formData.email, onChange: handleChange },
    ];

    return (
        <div className='editAdminContainer'>
            <CustomForm
                header='Edit Admin Details'
                fields={fields}
                createButtonLabel='Update Data'
                flexDirection='row'
                onSubmit={handleSubmit}
            />
            <Toaster />
        </div>
    );
};

export default EditAdmin;
