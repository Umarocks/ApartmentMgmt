import React, { useState, useRef } from "react";
import axios from "axios";

function CreateOwner() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    ssn: "",
    phone_no: "",
    address: "",
  });

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      name: formRef.current.name.value,
      ssn: formRef.current.ssn.value,
      phone_no: formRef.current.phone_no.value,
      address: formRef.current.address.value,
    };

    setFormData(updatedFormData);
    console.log(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/createOwner",
        updatedFormData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Owner</h2>
      {showSuccess && <div className="Green-Success">Owner Created</div>}

      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={formData.email}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          defaultValue={formData.password}
          onChange={handleChange}
        />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={formData.name}
          onChange={handleChange}
        />

        <label>SSN:</label>
        <input
          type="text"
          name="ssn"
          defaultValue={formData.ssn}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_no"
          defaultValue={formData.phone_no}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          defaultValue={formData.address}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateOwner;
