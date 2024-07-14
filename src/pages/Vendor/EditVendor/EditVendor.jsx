import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import "./EditVendor.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
const EditVendor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeURL = location.pathname.split("/")[4];
  const initialFormData = {
    vendorName: "",
    vendorCategory: "",
    address: "",
    email: "",
    phoneNumber: "",
    vendorUserName: "",
    vendorUserEmail: "",
    vendorUserPhone: "",
    companyLogo: "",
    accessGroup: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [accessGroups, setAccessGroups] = useState([]);
  const [vendorCategories, setVendorCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/vendor/get/detail`,
          {
            code: `${activeURL}`,
          }
        );
        setFormData({
          vendorName: response.data.data.name,
          phoneNumber: response.data.data.phoneNumber,
          address: response.data.data.address,
          email: response.data.data.email,
          panNumber: response.data.data.panNumber,
          vendorCategory: response.data.data.vendorCategory.name,
          vendorUserName: response.data.data.vendorUsers[0].name,
          vendorUserEmail: response.data.data.vendorUsers[0].email,
          vendorUserPhone: response.data.data.vendorUsers[0].mobileNumber,
          accessGroup: "Futsal Admin",
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
        updateAuthToken();
      } catch (error) {
        toast.error(error.message || "Failed to fetch access groups");
      }
    };
    const fetchVendorCategories = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/vendor/vendorCategory/get`,
          {
            firstRow: 0,
            pageSize: 0,
          }
        );
        setVendorCategories(response.data.data.records);
        updateAuthToken();
      } catch (error) {
        toast.error(error.message || "Failed to fetch access groups");
      }
    };
    fetchData();
    fetchAccessGroups();
    fetchVendorCategories();
  }, [activeURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fields = [
    {
      name: "vendorName",
      label: "Vendor Name",
      type: "text",
      value: formData.vendorName,
      onChange: handleChange,
    },
    {
      name: "vendorCategory",
      label: "Category",
      type: "select",
      value: formData.vendorCategory,
      onChange: handleChange,
      options: [
        { label: "Select Vendor Category", value: "" },
        ...vendorCategories.map((group) => ({
          label: group.name,
          value: group.name,
        })),
      ],
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
      label: "Email",
      type: "email",
      value: formData.email,
      onChange: handleChange,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      value: formData.phoneNumber,
      onChange: handleChange,
    },
    {
      name: "panNumber",
      label: "Pan Number",
      type: "text",
      value: formData.panNumber,
      onChange: handleChange,
      isDisabled: true,
    },
    {
      name: "vendorUserName",
      label: "System User Name",
      type: "text",
      value: formData.vendorUserName,
      onChange: handleChange,
    },
    {
      name: "vendorUserEmail",
      label: "System User Email",
      type: "email",
      value: formData.vendorUserEmail,
      onChange: handleChange,
      isDisabled: true,
    },
    {
      name: "vendorUserPhone",
      label: "System User Phone",
      type: "text",
      value: formData.vendorUserPhone,
      onChange: handleChange,
    },
    {
      name: "accessGroup",
      label: "Access Group",
      type: "select",
      value: formData.accessGroup || "",
      onChange: handleChange,
      options: [
        { label: "Select Access Group", value: "" },
        ...accessGroups.map((group) => ({
          label: group.name,
          value: group.name,
        })),
      ],
    },
    { name: "companyLogo", label: "Company Logo", type: "file" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/vendor/update`, {
          code: activeURL,
          name: formData.vendorName,
          category: {
            name: formData.vendorCategory,
          },
          logo: "https://marketplace.canva.com/EAE1JouRlE8/1/0/1600w/canva-abstract-business-arrow-up-logo-icon.-vector-design-template.-XmQVmJgSSqg.jpg",
          address: formData.address,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          vendorUser: {
            name: formData.vendorUserName,
            mobileNumber: formData.vendorUserPhone,
            email: formData.vendorUserEmail,
            accessGroup: {
              name: "Futsal Admin",
            },
          },
        }),
        {
          pending: "Processing your request",
        }
      );
      console.log(response);
      if (response.data.code == 0) {
        toast.success(response.data.message);
      }
      if (response.data.code != 0) {
        toast.error(response.data.message);
      }
      setFormData(initialFormData);
    } catch (error) {
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="editVendorContainer">
      <CustomForm
        header="Edit Vendor"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Update"
        onSubmit={handleSubmit}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditVendor;
