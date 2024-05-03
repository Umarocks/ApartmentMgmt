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

const Owner = () => {
    const ownerMenuItem = [
        { link: "/login", faValue: "faUser", value: "Login" },
        { link: "/owner/viewproperties", faValue: "faBuilding", value: "View Properties" },
        { link: "/owner/viewcomplaints", faValue: "faExclamationTriangle", value: "View Complaints" },
        { link: "/logout", faValue: "faCheck", value: "LogOut" }
      ];
      
  
  const { setMenuItems } = useContext(MyContext);
  useEffect(() => {
    setMenuItems(ownerMenuItem);
  }, []);

  return (
    <div className="owner-container">
      <Sidebar />
      <div className="dashboard">
        <h1>Welcome, Owner!</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Owner;
