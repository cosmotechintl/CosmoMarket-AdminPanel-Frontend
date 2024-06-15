import React, { useState } from 'react'
import "./CreateVendor.scss"
import CustomForm from '../../../components/CustomForm/CustomForm';
const CreateVendor = () => {

  const[formData, setFormData] = useState({
    vendorName:'',
    vendorCategory:'',
    address:'',
    email:'',
    mobileNumber:'',
    panNumber:'',
    userName:'',
    userEmail:'',
    userPhone:'',
    // companyLogo:''
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  }

  const fields = [
    { name: 'vendorName', label:'Vendor Name' ,type: 'text', value: formData.vendorName, onChange: handleChange },
    { name: 'vendorCategory', label:'Category' ,type: 'text', value: formData.vendorCategory, onChange: handleChange },
    { name: 'address', label:'Address' ,type: 'text', value: formData.address, onChange: handleChange },
    { name: 'email', label:'Email', type: 'email', value: formData.email, onChange: handleChange },
    { name: 'mobileNumber', label:'Phone Number', type: 'text', value: formData.mobileNumber, onChange: handleChange },
    { name: 'panNumber',label:'Pan Number', type: 'text', value: formData.panNumber, onChange: handleChange },
    { name: 'userName',label:'System User Name', type: 'text', value: formData.userName, onChange: handleChange },
    { name: 'userEmail',label:'System User Email', type: 'email', value: formData.userEmail, onChange: handleChange },
    { name: 'userPhone',label:'System User Phone', type: 'text', value: formData.userPhone, onChange: handleChange },
    { name: 'companyLogo', label: 'Company Logo', type: 'file' }
  ];
  return (
    <div className='createVendorContainer'>
        <CustomForm 
            header="Create Vendor"
            fields={fields}
            flexDirection="row"
            createButtonLabel='Create Vendor'
            onSubmit={handleSubmit}
        />
    </div>
  )
}

export default CreateVendor