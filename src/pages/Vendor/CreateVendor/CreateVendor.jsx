import React, { useEffect, useState } from "react";
import "./CreateVendor.scss";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../utils/config";
const CreateVendor = () => {
  const initialFormData = {
    vendorName: "",
    vendorCategory: "",
    address: "",
    email: "",
    phoneNumber: "",
    panNumber: "",
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
    fetchAccessGroups();
  }, []);
  useEffect(() => {
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
    fetchVendorCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/vendor/create`, {
          name: formData.vendorName,
          category: {
            name: formData.vendorCategory,
          },
          logo: "https://marketplace.canva.com/EAE1JouRlE8/1/0/1600w/canva-abstract-business-arrow-up-logo-icon.-vector-design-template.-XmQVmJgSSqg.jpg",
          address: formData.address,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          panNumber: formData.panNumber,
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
      tail: "Activation link will be sent to this email.",
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
  return (
    <div className="createVendorContainer">
      <CustomForm
        header="Create Vendor"
        fields={fields}
        flexDirection="row"
        createButtonLabel="Create Vendor"
        onSubmit={handleSubmit}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateVendor;
