import React, { useRef, useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Login.css"; // Import CSS file for login component styling
import axios from "axios";
import MyContext from "../../MyContext";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { setMenuItems } = useContext(MyContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(username);
    console.log(password);
    // Check if email and password are valid
    if (username && password) {
      // Perform login logic here
      axios
        .post(
          "http://localhost:3000/auth/login",
          { username, password },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // Handle the response data
          console.log(response.data);
          if (response.data.data.role === "Admin") {
            // Redirect to dashboard
            console.log("Redirecting to admin dashboard");
            window.location.href = "/admin";
          }
          if (response.data.data.role === "Tenant") {
            // Redirect to dashboard
            console.log("Redirecting to admin dashboard");
            window.location.href = "/tenant";
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
          setErrorMessage("Invalid email or password"); // Set error message
        });
    } else {
      // Display error message for invalid email or password
      console.log("Invalid email or password");
      setErrorMessage("Invalid email or password"); // Set error message
    }
  };

  return (
    <div className="login-page">
      <Sidebar />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Log In</h2>
          {errorMessage && (
            <div className="error-banner">{errorMessage}</div>
          )}{" "}
          {/* Add error banner */}
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" ref={emailRef} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <button className="submit-button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
