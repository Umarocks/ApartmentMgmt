import React, { useState, useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import backgroundImage from "../../Assets/Homepage.jpeg";
import {
  faUser,
  faMoneyBill,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import MyContext from "../../MyContext"; // Import your MyContext here

const Home = () => {
  const { menuItems, setMenuItems } = useContext(MyContext);
  console.log(menuItems);
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Home;
