import React from 'react'
import "./CreateAdmin.scss"
import CustomForm from '../../../components/CustomForm/CustomForm';
const CreateAdmin = () => {
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
    { name:'super admin', type:'select',
      options:
      [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    }
  ];
  return (
    <div className='createAdminContainer'>
      <CustomForm 
        header="Create Admin User"
        fields={fields}
        flexDirection="row"
      />
    </div>
  )
}

export default CreateAdmin