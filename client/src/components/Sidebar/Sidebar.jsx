import React, { useState, useContext } from "react";
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
import MyContext from "../../MyContext"; // Import your MyContext here

const Sidebar = () => {
  const { menuItems, setMenuItems } = useContext(MyContext);
  console.log(menuItems);
  return (
    <div className="sidebar">
      <h2 className="logo">Apartment.co</h2>
      <ul>
        {menuItems.map((item) => (
          <SideBarList
            key={item.link}
            link={item.link}
            faValue={item.faValue}
            value={item.value}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
