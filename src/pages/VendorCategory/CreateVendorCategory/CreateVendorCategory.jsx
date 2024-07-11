import React, { useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const CreateVendorCategory = () => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/vendor/vendorCategory/create`, {
          name: formData.name,
          description: formData.description,
        }),
        {
          pending: "Processing your request",
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message, {
          autoClose: 500,
          onClose: () => navigate(-1),
        });
      }
      if (response.data.code != 0) {
        toast.error(response.data.message);
      }
      setFormData(initialFormData);
    } catch (error) {
      toast.error(error.message || "Failed to create vendor category");
    } finally {
      setIsSubmitting(false);
    }
  };
  updateAuthToken();
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      value: formData.description,
      onChange: handleChange,
    },
  ];

  return (
    <div>
      <CustomForm
        header="Create Vendor Category"
        fields={fields}
        flexDirection="column"
        createButtonLabel="Create Category"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateVendorCategory;
