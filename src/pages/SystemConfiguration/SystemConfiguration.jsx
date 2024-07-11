import React from "react";
import "./SystemConfiguration.scss";
import Card from "../../components/Card/Card";
import { BiCategory } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
const SystemConfiguration = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="systemConfigurationContainer">
      <div className="systemConfigurationContents">
        <div className="systemConfigurationHeader">
          <span className="backIcon" onClick={handleBackClick}>
            <FaArrowLeftLong />
          </span>
          <span>System Configuration</span>
        </div>
        <div className="systemConfigurationCard">
          <Link to="vendorCategory" style={{ textDecoration: "none" }}>
            <Card icon={<BiCategory />} title="Vendor Category" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;
