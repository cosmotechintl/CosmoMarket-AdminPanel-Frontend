import React, { useEffect, useState } from "react";
import "./VendorCategoryList.scss";
import List from "../../../components/List/List";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
const VendorCategoryList = () => {
  const headers = ["Name", "Description"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/vendor/vendorCategory/get`,
          {
            firstRow: 1,
            pageSize: 3,
          }
        );
        const fetchedRows = response.data.data.records.map((vendorCategory) => [
          vendorCategory.name,
          vendorCategory.description,
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
    { link: `#`, text: "View" },
    { link: `#`, text: "Edit" },
    { link: `#`, text: "Delete" },
  ];

  return (
    <div className="vendorCategoryContainer">
      <div className="vendorCategoryContents">
        {rows ? (
          <List
            title="Vendor Category"
            createButtonLabel="Create Vendor Category"
            headers={headers}
            rows={rows}
            link="create"
            showEyeViewIcon={false}
            showFilterIcon={false}
            getMenuItems={getMenuItems}
          />
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default VendorCategoryList;
