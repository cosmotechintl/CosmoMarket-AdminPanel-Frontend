import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";
import { MdGroups2 } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./VendorDetails.scss";
const VendorDetails = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const activeURL = location.pathname.split("/")[4];
  console.log(activeURL);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const maskContent = (content) => {
    return isVisible ? content : content.replace(/./g, "*");
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/vendor/get/detail`,
          {
            code: `${activeURL}`,
          }
        );
        setData(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [activeURL, refresh]);
  console.log(activeURL);
  console.log(data);
  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  return (
    <div className="vendorDetailsContainer">
      <div className="vendorDetailsContents">
        <div className="vendorDetailsHeader">
          <span className="backIcon" onClick={handleBackClick}>
            <FaArrowLeftLong />
          </span>
          <span>Vendor Details</span>
          <span onClick={toggleVisibility} className="visibilityToggle">
            {isVisible ? (
              <FaEye title="Hide Sensitive Data" />
            ) : (
              <FaEyeSlash title="View Sensitive Data" />
            )}
          </span>
        </div>
        {data && data.data ? (
          <>
            <div className="body">
              <div className="left">
                <div className="companyLogoContainer">
                  <img
                    src={
                      data.data.logo
                        ? `${data.data.logo}`
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt="companyLogo"
                    className="companyLogo"
                  />
                </div>
                <div className="vendorBusinessDetailsContainer">
                  <span className="businessName">{data.data.name}</span>
                  <span className="businessCode" title="vendor code">
                    {maskContent(`@${data.data.code}`)}
                  </span>
                  <span className="businessStatus">
                    {data.data.status.name}
                  </span>
                  <span className="businessCategory" title="category">
                    <span className="icon">
                      <BiCategory />
                    </span>
                    <span className="categoryName">
                      {data.data.category
                        ? data.data.category.name
                        : "Unavailable"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="right">
                <div className="headerRight">Contact</div>
                <div className="emailContainer">
                  <span className="icon">
                    <FaEnvelope />
                  </span>
                  <span className="email">{maskContent(data.data.email)}</span>
                </div>
                <div className="phoneContainer">
                  <span className="icon">
                    <FaPhoneAlt />
                  </span>
                  <span className="phone">
                    {maskContent(data.data.phoneNumber)}
                  </span>
                </div>
                <div className="addressContainer">
                  <span className="icon">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="phone">{data.data.address}</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <Link to={`/admin/vendor/edit/${activeURL}`}>
                <button
                  type="button"
                  className="edit-btn"
                  disabled={data.data.status.name === "DELETED"}
                >
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
                // onClick={handleDeleteUser}
              >
                Delete
              </button>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
                // onClick={
                //   data.data.status.name === "BLOCKED"
                //     ? handleUnblockUser
                //     : handleBlockUser
                // }
              >
                {data.data.status.name === "BLOCKED" ? "Unblock" : "Block"}
              </button>

              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
              >
                Reset Two Factor Authentication
              </button>
            </div>
            {data.data.vendorUsers && (
              <div className="vendorUsersDetails">
                <span className="vendorUserDetailsHeader">
                  Vendor User Lists
                </span>
                <div className="vendorUserDetailsBody">
                  <div className="userList">
                    <table border={1}>
                      <thead>
                        <tr>
                          <th>S.N</th>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Access Group</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.vendorUsers.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.address}</td>
                            <td>{maskContent(`${user.mobileNumber}`)}</td>
                            <td style={{ textAlign: "left" }}>
                              {maskContent(`${user.email}`)}
                            </td>
                            <td>{user.accessGroup.name}</td>
                            <td>{user.status.name}</td>
                            <td>
                              <span className="btnContainer">
                                <span className="editBtn">Edit</span>
                                <span className="blockBtn">Block</span>
                                <span className="deleteBtn">Delete</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default VendorDetails;
