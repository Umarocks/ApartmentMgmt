import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import backgroundImage from "../../Assets/Homepage.jpeg";
import {
  faUser,
  faMoneyBill,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import MyContext from "../../MyContext"; // Import your MyContext here
import Login from "../Login/Login";
import newmenuItems from "../../MenuItems";
const Home = () => {
  const { menuItems, setMenuItems } = useContext(MyContext);
  useEffect(() => {
    setMenuItems(menuItems);
    setIsLoading(false);
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  console.log(menuItems);
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Home;
