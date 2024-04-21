import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Payrent from "./components/PayRent/Payrent";
import Filecomplaint from "./components/FileComplaint/Filecomplaint";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";

function App() {
  return (
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
  );
}

export default App;
