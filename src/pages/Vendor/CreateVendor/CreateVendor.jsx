import React from 'react'
import "./CreateVendor.scss"
import CustomForm from '../../../components/CustomForm/CustomForm';
const CreateVendor = () => {
    const fields = [
        { name: 'name', type: 'text' },
        { name: 'username', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'mobile', type: 'text' },
        { name: 'address', type: 'text' },
        { name:"access group", type: "select",
          options:
          [
            { label: 'Vendor', value: 'vendor' },
            { label: 'User', value: 'user' },
            { label: 'Customer', value: 'customer' }
          ]
        },
      ];
  return (
    <div className='createVendorContainer'>
        <CustomForm 
            header="Create Vendor"
            fields={fields}
            flexDirection="row"
        />
    </div>
  )
}

export default CreateVendor