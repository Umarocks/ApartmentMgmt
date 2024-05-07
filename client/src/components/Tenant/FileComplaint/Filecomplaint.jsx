import React, { useState, useRef } from "react";
import axios from "axios";
import "./FileComplaint.css";

function FileComplaint() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    complaint: "",
  });

  // Add state for managing errors
  const [error, setError] = useState("");

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      fullName: formRef.current.fullName.value,
      email: formRef.current.email.value,
      complaint_description: formRef.current.complaint.value,
    };

    setFormData(updatedFormData);
    console.log(updatedFormData);

    try {
      const response = await axios.post(
        "http://localhost:3000/tenant/complaints",
        updatedFormData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      setError("Failed to submit the complaint."); // Set error message on failure
    }
  };

  return (
    <div className="file-complaint-page">
      <div className="file-complaint-form-container">
        <form
          className="file-complaint-form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <h2>File Complaint</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              ref={formRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={formRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="complaint">Complaint:</label>
            <textarea
              id="complaint"
              name="complaint"
              rows="4"
              value={formData.complaint}
              onChange={handleChange}
              ref={formRef}
            ></textarea>
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      </div>
      {showSuccess && <div className="Green-Success">Admin Created</div>}
    </div>
  );
}

export default FileComplaint;
