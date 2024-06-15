import React, { useEffect, useState } from 'react';
import List from '../../../components/List/List';
import "./AdminList.scss";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from '../../../utils/config';
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import Loader from "../../../components/Loader/Loader"
const AdminList = () => {
  const headers = ["Name", "Email", "Mobile No", "Access Group", "Status"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/adminUser`, {
          "firstRow": 1,
          "pageSize": 3
        });
        const fetchedRows = response.data.data.records.map(user => [
          user.name,
          user.email,
          user.mobileNumber,
          user.accessGroup.name,
          user.status.name
        ]);
        setRows(fetchedRows);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: 'View' },
    { link: `/delete/${row[1]}`, text: 'Delete' },
    { link: `/delete/${row[1]}`, text: 'Block' },
    { link: `/delete/${row[1]}`, text: 'Reset Password' }
  ];

  return (
    <div className="adminListContainer">
      { rows ? 
        <List
          title="Admin Users"
          createButtonLabel='Create Admin'
          headers={headers}
          rows={rows}
          link="create"
          showEyeViewIcon={true}
          showFilterIcon={true}
          getMenuItems={getMenuItems} 
        />
        : <Loader/>
      }
      <Toaster />
    </div>
  );
};

export default AdminList;
