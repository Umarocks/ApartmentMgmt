import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// import "./Owner.css"; // Make sure to create or reference the appropriate CSS file
import "./Tenant.css"; // Import CSS file for Tenant component styling
import { Outlet } from "react-router-dom";
import MyContext from "../../MyContext";
import Sidebar from "../Sidebar/Sidebar";

const Tenant = () => {
  const TenantMenuItem = [
    { link: "/tenant", faValue: "faUser", value: "Home" },
    { link: "/tenant/payrent", faValue: "faBuilding", value: "pay rent" },
    {
      link: "/tenant/filecomplaints",
      faValue: "faExclamationTriangle",
      value: "File Complaints",
    },
    { link: "/logout", faValue: "faCheck", value: "LogOut" },
  ];

  const { setMenuItems } = useContext(MyContext);
  useEffect(() => {
    setMenuItems(TenantMenuItem);
  }, []);

  return (
    <div className="Tenant-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="dashboard">
        <div className="content">
          <h1>Welcome, Tenant!</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Tenant;
