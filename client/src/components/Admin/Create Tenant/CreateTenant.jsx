import React, { useState, useRef } from "react";
import axios from "axios";

//THIS IS UNFINISHED RN. I CAN ONLY PUT PEOPLE IN AN APARTMENT IF IT EXISTS SO NEED TO FIGURE THAT OUT

function CreateTenant() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    ssn: "",
    phone_no: "",
    address: "",
    Age: 0,
    perm_address: "",
    apt_no: "",
    phone: "",
    block_name: "",
    apt_address: "",
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
        "http://localhost:3000/admin/createTenant",
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
      <h2>Create Tenant</h2>
      {showSuccess && <div className="Green-Success">Tenant Created</div>}

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

        <label>Age:</label>
        <input
          type="number"
          name="Age"
          defaultValue={formData.Age}
          onChange={handleChange}
        />

        <label>Permanent Address:</label>
        <input
          type="text"
          name="perm_address"
          defaultValue={formData.perm_address}
          onChange={handleChange}
        />

        <label>Apartment Number:</label>
        <input
          type="text"
          name="apt_no"
          defaultValue={formData.apt_no}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          defaultValue={formData.phone}
          onChange={handleChange}
        />

        <label>Block Name:</label>
        <input
          type="text"
          name="block_name"
          defaultValue={formData.block_name}
          onChange={handleChange}
        />

        <label>Apartment Address:</label>
        <input
          type="text"
          name="apt_address"
          defaultValue={formData.apt_address}
          onChange={handleChange}
        />

        <div className="submit-btn">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTenant;
