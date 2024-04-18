import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Payrent.css'; // Import CSS file for PayRent component styling

const Payrent = () => {
  return (
    <div className="pay-rent-page">
      <Sidebar />
      <div className="pay-rent-form-container">
        <form className="pay-rent-form">
          <div className="form-group">
            <label htmlFor="tenantName">Tenant Name:</label>
            <input type="text" id="tenantName" name="tenantName" />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" />
          </div>
          <button type="submit" className="submit-button">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default Payrent;
