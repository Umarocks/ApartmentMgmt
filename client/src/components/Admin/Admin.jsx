import React from "react";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <ul>
          <li>Create Admin</li>
          <li>Create User</li>
          <li>Create Tenant</li>
          {/* Add more sidebar items here */}
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
