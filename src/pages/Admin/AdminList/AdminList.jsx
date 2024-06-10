import React from 'react';
import List from '../../../components/List/List';
import "./AdminList.scss";

const AdminList = () => {
  const headers = ["Name", "Username", "Email", "Mobile No", "Address"];
  const rows = [
    ["Super Admin", "superadmin", "superadmin@gmail.com", "9804567342", "Tinkune, Kathmandu"],
    ["Super Admin", "superadmin", "superadmin@gmail.com", "9804567342", "Tinkune, Kathmandu"],
  ];
  return (
    <div className="adminListContainer">
      <List
        title="Admin Users"
        createButtonLabel='Create Admin'
        headers={headers}
        rows={rows}
        link="create"
        showEyeViewIcon={true}
        showFilterIcon={true}
      />
    </div>
  );
};

export default AdminList;
