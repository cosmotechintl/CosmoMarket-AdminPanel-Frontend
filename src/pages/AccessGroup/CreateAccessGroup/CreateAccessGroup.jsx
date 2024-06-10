import React from 'react';
import "./CreateAccessGroup.scss";
import CustomForm from '../../../components/CustomForm/CustomForm';
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from '../../../utils/config';
import { adminRequest } from '../../../utils/requestMethods';
const CreateAccessGroup = () => {
  const{ data,loading,error } = useFetch(`${BASE_URL}/roles`, adminRequest);
  console.log(data);
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
      <CustomForm header="Create Access Group" fields={fields} flexDirection='column' useCheckboxesForRoles={true}  />
    </div>
  );
}

export default CreateAccessGroup;
