import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Payrent from "./components/PayRent/Payrent";
import Filecomplaint from "./components/FileComplaint/Filecomplaint";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import React, { useState } from "react";
import {
  faUser,
  faMoneyBill,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import MyContext from "./MyContext";
function App() {
  const [menuItems, setMenuItems] = useState([
    { link: "/login", faValue: faUser, value: "Login" },
    { link: "/signup", faValue: faUser, value: "Sign Up" },
    { link: "/pay-rent", faValue: faMoneyBill, value: "Pay Rent" },
    { link: "/file-complaint", faValue: faCheck, value: "File Complaint" },
  ]);
  return (
    <MyContext.Provider value={{ menuItems, setMenuItems }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pay-rent" element={<Payrent />} />
          <Route path="/file-complaint" element={<Filecomplaint />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
