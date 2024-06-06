import React from 'react'
import "./Sidebar.scss"
import { IoHomeOutline,IoBusinessOutline,IoPersonOutline,IoSettingsOutline  } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { PiSignOut } from "react-icons/pi";
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import { performLogout } from '../../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const activeURL = location.pathname.split('/')[2];
  const handleSignout=()=>{
    performLogout(()=>{
      toast.success("Logging Out");
      navigate("/");
    });
  }
  return (
    <div className="sidebarContainer">
      <div className="sidebarContents">
        <div className="sidebarMenuContainer">
          <Link to="/admin/dashboard" style={{ textDecoration:"none" }}>
            <SidebarMenu 
              icon={<IoHomeOutline/>} 
              title="Dashboard"
              isActive={!activeURL || activeURL === "dashboard" || activeURL === "profile"}
            />
          </Link>
          <Link to="/admin/users" style={{ textDecoration:"none" }}>
            <SidebarMenu 
              icon={<GrUserAdmin/>} 
              title="Admin" 
              isActive={activeURL === "users"}
            />
          </Link>
          <Link to="/admin/vendors" style={{ textDecoration:"none" }}>
            <SidebarMenu 
              icon={<IoBusinessOutline/>} 
              title="Vendors" 
              isActive={activeURL === "vendors"}
            />
          </Link>
          <SidebarMenu 
            icon={<IoPersonOutline/>} 
            title="Customers" 
            isActive={activeURL === "customers"}
          />
          <SidebarMenu
            icon={<TbReportSearch/>}
            title="Reports"
            isActive={activeURL === "reports"}
          />
          <Link to="/admin/settings" style={{ textDecoration:"none" }}>
            <SidebarMenu
              icon={<IoSettingsOutline/>}
              title="Settings"
              isActive={activeURL === "settings"}
            />
          </Link>  
          <SidebarMenu
            icon={<PiSignOut/>}
            title="Sign Out"
            onClick={handleSignout}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Sidebar