import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './FileComplaint.css'; // Import CSS file for FileComplaint component styling

const FileComplaint = () => {
  return (
    <div className="file-complaint-page">
      <Sidebar />
      <div className="file-complaint-form-container">
        <form className="file-complaint-form">
        <h2>File Complaint</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="complaint">Complaint:</label>
            <textarea id="complaint" name="complaint" rows="4"></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}

export default FileComplaint;
