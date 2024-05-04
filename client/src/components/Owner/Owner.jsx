import React, { useContext, useEffect } from "react";
import "./Owner.css";
import { Outlet, useOutlet } from "react-router-dom";
import MyContext from "../../MyContext";
import Sidebar from "../Sidebar/Sidebar";

const Owner = () => {
  const ownerMenuItem = [
    { link: "/owner", faValue: "faBuilding", value: "Home" },
    { link: "/owner/viewproperties", faValue: "faBuilding", value: "View Properties" },
    { link: "/owner/viewcomplaints", faValue: "faExclamationTriangle", value: "View Complaints" },
    { link: "/logout", faValue: "faSignOutAlt", value: "Log Out" },
  ];

  const { setMenuItems } = useContext(MyContext);

  useEffect(() => {
    setMenuItems(ownerMenuItem);
  }, []);
  const outlet = useOutlet();
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
