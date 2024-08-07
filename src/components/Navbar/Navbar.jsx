import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { IoChevronDownSharp } from "react-icons/io5";
import Menu from "../Menu/Menu";
import { BASE_URL } from "../../utils/config";
import { adminRequest, updateAuthToken } from "../../utils/requestMethods";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { data } = useFetch(`${BASE_URL}/adminUser/get/detail`, adminRequest);
  updateAuthToken();
  const goToHome = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };
  return (
    <div className="navbarContainer">
      <div className="logoContainer" onClick={goToHome}>
        {/* <div className="left">
          <img src={logo} alt="logo" className='logoImg' />
        </div> */}
        <div className="right">
          <h1 className="header">
            cosmo<span>MARKET</span>
          </h1>
          {/* <small>Admin Panel</small> */}
        </div>
      </div>
      <div className="profileContainer" onClick={toggleMenu} ref={menuRef}>
        <div className="profile">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="profile"
            className="profileImg"
          />
          <span className="profileName">
            Namaste, {data && data.data ? data.data.username : ""}
          </span>
          <span className="chevron">
            <IoChevronDownSharp />
          </span>
        </div>
        {isMenuOpen && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
