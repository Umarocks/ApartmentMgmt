import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMoneyBill,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import SideBarList from "../SideBarList/SideBarList";
const Sidebar = () => {
  return (
    <div className="home">
      {/* <h1>Welcome to Apartment Management System</h1> */}
      <div className="sidebar">
        <h2 className="logo">Apartment.co</h2>
        <ul>
          <SideBarList link="/login" faValue={faUser} value="Login" />
          <SideBarList link="/signup" faValue={faUser} value="Sign Up" />
          <SideBarList
            link="/pay-rent"
            faValue={faMoneyBill}
            value="Pay Rent"
          />
          <SideBarList
            link="/file-complaint"
            faValue={faCheck}
            value="File Complaint"
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
