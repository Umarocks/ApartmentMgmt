import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Signup.css'; // Import CSS file for Signup component styling

const Signup = () => {
  return (
    <div className="signup-page">
      <Sidebar />
      <div className="signup-form-container">
        <form className="signup-form">
        <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input type="text" id="mobile" name="mobile" />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
