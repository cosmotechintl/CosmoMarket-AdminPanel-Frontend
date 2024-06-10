import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserProfile from "../../components/Userprofile/UserProfile";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import "./Homepage.scss";
import SettingPage from '../SettingPage/SettingPage';
import AccessGroupPage from '../AccessGroup/AccessGroupList/AccessGroupList';
import CreateAccessGroup from '../AccessGroup/CreateAccessGroup/CreateAccessGroup';
import AdminList from '../Admin/AdminList/AdminList';
import CreateAdmin from '../Admin/CreateAdmin/CreateAdmin';
import VendorList from '../Vendor/VendorList/VendorList';
import CreateVendor from '../Vendor/CreateVendor/CreateVendor';
import CustomerList from '../Customer/CustomerList/CustomerList';
import ReportPage from '../ReportPage/ReportPage';
const Homepage = () => {
  return (
    <div className="homepageContainer">
        <div className="homepageContents">
          <div className="homepage__top">
            <div className="navbarArea">
              <Navbar/>
            </div>
          </div>
          <div className="middle">
            <div className="homepageContents__left">
                <div className="sidebarArea">
                  <Sidebar/>
                </div>
            </div>
            <div className="homepageContents__right">
              <Routes>
                <Route path="profile" element={<UserProfile />}/>
                <Route path="adminUser" element={<AdminList />}/>
                <Route path="adminUser/create" element={<CreateAdmin />}/>
                <Route path="vendor" element={<VendorList/>} />
                <Route path="vendors/create" element={<CreateVendor/>} />
                <Route path="customer" element={<CustomerList/>}/>
                <Route path="reports" element={<ReportPage/>}/>
                <Route path="setting" element={<SettingPage />}/>
                <Route path="setting/group" element={<AccessGroupPage />}/>
                <Route path="setting/group/create" element={<CreateAccessGroup />}/>
              </Routes>
            </div>
          </div>
        </div>
    </div>  
  )
}
export default Homepage