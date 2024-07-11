import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "../../components/Userprofile/UserProfile";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.scss";
import SettingPage from "../SettingPage/SettingPage";
import AccessGroupPage from "../AccessGroup/AccessGroupList/AccessGroupList";
import CreateAccessGroup from "../AccessGroup/CreateAccessGroup/CreateAccessGroup";
import AdminList from "../Admin/AdminList/AdminList";
import CreateAdmin from "../Admin/CreateAdmin/CreateAdmin";
import VendorList from "../Vendor/VendorList/VendorList";
import CreateVendor from "../Vendor/CreateVendor/CreateVendor";
import CustomerList from "../Customer/CustomerList/CustomerList";
import ReportPage from "../ReportPage/ReportPage";
import ChangePassword from "../ChangePassword/ChangePassword";
import { ToastContainer, toast } from "react-toastify";
import AdminDetails from "../Admin/AdminDetails/AdminDetails";
import EditAdmin from "../Admin/EditAdmin/EditAdmin";
import AccessGroupDetails from "../AccessGroup/AccessGroupDetails/AccessGroupDetails";
import VendorDetails from "../Vendor/VendorDetails/VendorDetails";
import EditVendor from "../Vendor/EditVendor/EditVendor";
import SystemConfiguration from "../SystemConfiguration/SystemConfiguration";
import VendorCategoryList from "../VendorCategory/VendorCategoryList/VendorCategoryList";
import CreateVendorCategory from "../VendorCategory/CreateVendorCategory/CreateVendorCategory";
const Homepage = () => {
  return (
    <div className="homepageContainer">
      <div className="homepageContents">
        <div className="homepage__top">
          <div className="navbarArea">
            <Navbar />
          </div>
        </div>
        <div className="middle">
          <div className="homepageContents__left">
            <div className="sidebarArea">
              <Sidebar />
            </div>
          </div>
          <div className="homepageContents__right">
            <Routes>
              <Route path="profile" element={<UserProfile />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="adminUser" element={<AdminList />} />
              <Route path="adminUser/create" element={<CreateAdmin />} />
              <Route path="adminUser/view/:email" element={<AdminDetails />} />
              <Route path="adminUser/edit/:email" element={<EditAdmin />} />
              <Route path="vendor" element={<VendorList />} />
              <Route path="vendor/create" element={<CreateVendor />} />
              <Route path="vendor/view/:code" element={<VendorDetails />} />
              <Route path="vendor/edit/:code" element={<EditVendor />} />
              <Route path="customer" element={<CustomerList />} />
              <Route path="reports" element={<ReportPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="setting/group" element={<AccessGroupPage />} />
              <Route
                path="setting/group/create"
                element={<CreateAccessGroup />}
              />
              <Route
                path="setting/group/view/:name"
                element={<AccessGroupDetails />}
              />
              <Route
                path="setting/systemConfiguration"
                element={<SystemConfiguration />}
              />
              <Route
                path="setting/systemConfiguration/vendorCategory"
                element={<VendorCategoryList />}
              />
              <Route
                path="setting/systemConfiguration/vendorCategory/create"
                element={<CreateVendorCategory />}
              />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" draggable />
    </div>
  );
};
export default Homepage;
