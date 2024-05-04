import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import SideBarList from "../SideBarList/SideBarList";
import MyContext from "../../MyContext"; // Import your MyContext here
import logo from "../../Assets/Logo-removebg-preview.png";
const Sidebar = () => {
  const { menuItems, setMenuItems } = useContext(MyContext);
  console.log(menuItems);
  return (
    <>
      <div className="sidebar-container">
        <img src={logo} alt="" />
        <h4 className="logo">Apartment.com</h4>

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
    </>
  );
};

export default Sidebar;
