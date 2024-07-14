import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import "./VendorList.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../utils/config";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import Loader from "../../../components/Loader/Loader";

const VendorList = () => {
  const headers = ["Name", "Mobile No", "Address", "Category", "Status"];
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/vendor/get`, {
          firstRow: 1,
          pageSize: 3,
        });
        setVendors(response.data.data.records);
      } catch (error) {
        toast.error("Internal Server Error.");
      }
    };
    fetchData();
  }, []);

  updateAuthToken();

  const getMenuItems = (vendor) => [
    { link: `view/${vendor.code}`, text: "View" },
    { link: `delete/${vendor.code}`, text: "Delete" },
    { link: `block/${vendor.code}`, text: "Block" },
    { link: `reset-password/${vendor.code}`, text: "Reset Password" },
  ];

  const rows = vendors.map((vendor) => [
    vendor.name,
    vendor.phoneNumber,
    vendor.address,
    vendor.vendorCategory
      ? vendor.vendorCategory.name ?? "Unavailable"
      : "Unavailable",
    vendor.status.name,
  ]);

  return (
    <div className="vendorListContainer">
      {vendors ? (
        <List
          title="Vendors List"
          createButtonLabel="Create Vendor"
          headers={headers}
          rows={rows}
          link="create"
          showEyeViewIcon={true}
          showFilterIcon={true}
          getMenuItems={(vendor) =>
            getMenuItems(vendors.find((v) => v.phoneNumber === vendor[1]))
          }
        />
      ) : (
        <Loader />
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default VendorList;
