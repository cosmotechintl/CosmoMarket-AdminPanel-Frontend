import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import "./EditAdmin.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const EditAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeURL = location.pathname.split("/")[4];

  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    email: "",
    accessGroup: "",
  });
  const [accessGroups, setAccessGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/adminUser/get`, {
          email: `${activeURL}`,
        });
        setData(response.data);
        setFormData({
          fullName: response.data.data.name,
          mobileNumber: response.data.data.mobileNumber,
          address: response.data.data.address,
          email: response.data.data.email,
          accessGroup: response.data.data.accessGroup.name,
        });
        console.log(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };

    const fetchAccessGroups = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
          firstRow: 0,
          pageSize: 0,
        });
        setAccessGroups(response.data.data.records);
      } catch (error) {
        toast.error(error.message || "Failed to fetch access groups");
      }
    };

    fetchData();
    fetchAccessGroups();
  }, [activeURL]);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changes = `
      <div className="editedChanges" style="font-size:16px; display:flex; flex-direction:column; align-items:center; gap:7px; padding:5px;">
        <span className="updatedFullName" style="display:flex; flex-direction:row; gap:10px;">
          <span className="editedChangesTitle"><strong>Full Name:</strong></span>
          <span>${formData.fullName}</span>
        </span>
        <span className="updatedMobileNumber" style="display:flex; flex-direction:row; gap:10px;">
          <span className="editedChangesTitle"><strong>Mobile Number:</strong></span>
          <span>${formData.mobileNumber}</span>
        </span>
        <span className="updatedAddress" style="display:flex; flex-direction:row; gap:10px;">
          <span className="editedChangesTitle"><strong>Address:</strong></span>
          <span>${formData.address}</span>
        </span>
        <span className="updatedAddress" style="display:flex; flex-direction:row; gap:10px;">
          <span className="editedChangesTitle"><strong>Access Group:</strong></span>
          <span>${formData.accessGroup}</span>
        </span>
      </div>
    `;

    const result = await Swal.fire({
      title: "Confirm Changes",
      html: changes,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Yes, save changes!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await toast.promise(
          adminRequest.post(`${BASE_URL}/adminUser/update`, {
            email: activeURL,
            name: formData.fullName,
            mobileNumber: formData.mobileNumber,
            address: formData.address,
            email: formData.email,
            accessGroup: {
              name: formData.accessGroup,
            },
          }),
          {
            pending: "Your request is being processed",
          }
        );
        if (response.data.code == 0) {
          toast.success(response.data.message, {
            autoClose: 1500,
            onClose: () => navigate(-1),
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "Failed to update data");
      }
    }
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      value: formData.fullName,
      onChange: handleChange,
    },
    {
      name: "mobileNumber",
      label: "Mobile Number",
      type: "text",
      value: formData.mobileNumber,
      onChange: handleChange,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: formData.address,
      onChange: handleChange,
    },
    {
      name: "email",
      label: "Email (Username)",
      type: "email",
      value: formData.email,
      onChange: handleChange,
      isDisabled: true,
    },
    {
      name: "accessGroup",
      label: "Access Group",
      type: "select",
      value: formData.accessGroup,
      onChange: handleChange,
      options: accessGroups.map((group) => ({
        label: group.name,
        value: group.name,
      })),
    },
  ];

  return (
    <div className="editAdminContainer">
      <CustomForm
        header="Edit Admin Details"
        fields={fields}
        createButtonLabel="Update"
        flexDirection="row"
        onSubmit={handleSubmit}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditAdmin;
