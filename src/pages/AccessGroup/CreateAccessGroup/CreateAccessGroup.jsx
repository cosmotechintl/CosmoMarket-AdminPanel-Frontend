import React from 'react';
import "./CreateAccessGroup.scss";
import CustomForm from '../../../components/CustomForm/CustomForm';

const CreateAccessGroup = () => {
  const fields = [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'type', type: 'select', 
      options: [
        { label: 'Group1', value: 'group1' }, 
        { label: 'Group2', value: 'group2' },
        { label: 'Group3', value: 'group3' },
      ] 
    }
  ];

  return (
    <div>
      <CustomForm header="Create Access Group" fields={fields} flexDirection='column' />
    </div>
  );
}

export default CreateAccessGroup;
