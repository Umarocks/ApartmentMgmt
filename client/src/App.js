import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import CreateAdmin from "./components/Admin/Create Admin/CreateAdmin";
import CreateOwner from "./components/Admin/Create Owner/CreateOwner";
import ViewProperties from "./components/Owner/View Properties/ViewProperties";
import ViewComplaints from "./components/Owner/View Complaints/ViewComplaints";
import PayRent from "./components/Tenant/PayRent/Payrent";
import FileComplaint from "./components/Tenant/FileComplaint/Filecomplaint";
import React, { useState } from "react";
import AllComplaint from "./components/Admin/AllComplaint/AllComplaint";
import MyContext from "./MyContext";
import Logout from "./components/Logout/Logout";
import Owner from "./components/Owner/Owner";
import Tenant from "./components/Tenant/Tenant";
import CreateTenant from "./components/Admin/Create Tenant/CreateTenant";
import AllOwner from "./components/Admin/AllOwner/AllOwner";

function App() {
  const [menuItems, setMenuItems] = useState([
    { link: "/login", faValue: "faUser", value: "Login" },
    { link: "/signup", faValue: "faUser", value: "Sign Up" },
    // { link: "/pay-rent", faValue: "faMoneyBill", value: "Pay Rent" },
    // { link: "/file-complaint", faValue: "faCheck", value: "File Complaint" },
  ]);

  return (
    <MyContext.Provider value={{ menuItems, setMenuItems }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />}>
            {/* <Route path="/admin/createadmin" element={<CreateAdmin />} /> */}
            <Route path="createadmin" element={<CreateAdmin />} />
            <Route path="createowner" element={<CreateOwner />} />
            <Route path="createtenant" element={<CreateTenant />} />{" "}
            <Route path="getallowner" element={<AllOwner />} />
            <Route path="getallcomplaint" element={<AllComplaint />} />
            {/* Add this line */}
          </Route>
          <Route path="/owner" element={<Owner />}>
            <Route path="viewproperties" element={<ViewProperties />} />
            <Route path="viewcomplaints" element={<ViewComplaints />} />
          </Route>
          <Route path="/tenant" element={<Tenant />}>
            <Route path="payrent" element={<PayRent />} />
            <Route path="filecomplaint" element={<FileComplaint />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
