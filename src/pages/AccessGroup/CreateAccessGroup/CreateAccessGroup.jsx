import React from 'react'
import "./CreateAccessGroup.scss"
import CustomForm from '../../../components/CustomForm/CustomForm';
const CreateAccessGroup = () => {
    const fields = [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'type', type: 'select', 
          options: 
          [
            { label: 'Vendor', value: 'vendor' }, 
            { label: 'User', value: 'user' }
          ] 
        }
    ];
  return (
    <div>
      <CustomForm header="Create Access Group" fields={fields} />
    </div>
  )
}

export default CreateAccessGroup