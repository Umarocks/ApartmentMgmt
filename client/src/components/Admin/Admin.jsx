import React, { useState } from "react";
import axios from "axios";
import {
  faUser,
  faMoneyBill,
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import MyContext from "../../App"; // Import your MyContext here
const Admin = () => {
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      // Redirect to login page after successful logout
      window.location.href = "/login";
      // Perform any additional logic after successful logout
    } catch (error) {
      // Handle error if logout request fails
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="admin-container">
      <div className="sidebar">
        <ul>
          <li>Create Admin</li>
          <li>Create User</li>
          <li>Create Tenant</li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="dashboard">
        <h1>Welcome, Admin!</h1>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default Admin;
