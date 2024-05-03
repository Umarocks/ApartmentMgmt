import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// import "./Owner.css"; // Make sure to create or reference the appropriate CSS file
import {
  faUser,
  faBuilding,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import MyContext from "../../MyContext";
import Sidebar from "../Sidebar/Sidebar";

const Tenant = () => {
    const TenantMenuItem = [
        { link: "/login", faValue: "faUser", value: "Login" },
        { link: "/tenant/payrent", faValue: "faBuilding", value: "pay rent" },
        { link: "/tenant/filecomplaints", faValue: "faExclamationTriangle", value: "File Complaints" },
        { link: "/logout", faValue: "faCheck", value: "LogOut" }
      ];
      
  
  const { setMenuItems } = useContext(MyContext);
  useEffect(() => {
    setMenuItems(TenantMenuItem);
  }, []);

  return (
    <div className="Tenant-container">
      <Sidebar />
      <div className="dashboard">
        <h1>Welcome, Tenant!</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Tenant;
