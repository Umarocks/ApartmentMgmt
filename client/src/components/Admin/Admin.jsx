import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import {
  faUser,
  faMoneyBill,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import MyContext from "../../MyContext";
import Sidebar from "../Sidebar/Sidebar";
const Admin = () => {
  const adminMenuItem = [
    { link: "/login", faValue: "faUser", value: "Login" },
    { link: "/admin/createadmin", faValue: "faUser", value: "Admin create" },
    { link: "/pay-rent", faValue: "faMoneyBill", value: "Admin" },
    {
      link: "/logout",
      faValue: "faCheck",
      value: "LogOut",
    },
  ];
  const { setMenuItems } = useContext(MyContext);
  useEffect(() => {
    setMenuItems(adminMenuItem);
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="dashboard">
        <h1>Welcome, Admin!</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
