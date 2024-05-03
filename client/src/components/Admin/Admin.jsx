import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { Outlet } from "react-router-dom";
import MyContext from "../../MyContext";
import Sidebar from "../Sidebar/Sidebar";
import Table from "../Table/Table";
const Admin = () => {
  const [TenantInfor, setTenantInfor] = useState([]);
  const [tenantCount, setTenantCount] = useState("0");
  const adminMenuItem = [
    { link: "/login", faValue: "faUser", value: "Login" },
    { link: "/admin/createadmin", faValue: "faUser", value: "Create Admin" },
    {
      link: "/admin/createowner",
      faValue: "faMoneyBill",
      value: "Create Owner",
    },
    {
      link: "/admin/createtenant",
      faValue: "faExclamationTriangle",
      value: "Create Tenant",
    },
    {
      link: "/logout",
      faValue: "faCheck",
      value: "LogOut",
    },
  ];
  const { setMenuItems } = useContext(MyContext);

  useEffect(() => {
    setMenuItems(adminMenuItem);
    try {
      const fetchData = async () => {
        const response = await axios
          .get(`http://localhost:3000/admin/totalTenant?${Date.now()}`, {
            withCredentials: true,
          })
          .then((response) => {
            setTenantInfor(response.data.tenantInformation);
            setTenantCount(response.data.tenantCount);
            console.log(response);
            console.log(TenantInfor);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="dashboard">
        <h1>Welcome, Admin!</h1>
        <h2>Tenant Count = {tenantCount.count}</h2>
        <Outlet />
        {/* <Table data={TenantInfor} /> */}
      </div>
    </div>
  );
};

export default Admin;
