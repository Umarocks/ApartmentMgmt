// {
//     "email":"{{$randomEmail}}",
//     "password":"employee1234",
//     "name":"{{$randomFirstName}}",
//     "phone":"{{$randomPhoneNumberExt}}",
//     "shift_timings":"9:00 AM - 5:00 PM",
//     "contract_length":"65D"
// }

import React, { useState, useRef } from "react";
import axios from "axios";

function CreateEmployee() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "employee1234",
    name: "",
    phone: "",
    shift_timings: "9:00 AM - 5:00 PM",
    contract_length: "65D",
  });

  const formRef = useRef({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      name: formRef.current.name.value,
      phone: formRef.current.phone.value,
      shift_timings: formRef.current.shift_timings.value,
      contract_length: formRef.current.contract_length.value,
    };

    setFormData(updatedFormData);
    console.log(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/createEmployee",
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
      <h2>Create Employee</h2>
      {showSuccess && <div className="Green-Success">Employee Created</div>}

      <form onSubmit={handleSubmit} ref={formRef}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={formData.email}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          defaultValue={formData.password}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={formData.name}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          defaultValue={formData.phone}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Shift Timings:</label>
        <input
          type="text"
          name="shift_timings"
          defaultValue={formData.shift_timings}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Contract Length:</label>
        <input
          type="text"
          name="contract_length"
          defaultValue={formData.contract_length}
          onChange={handleChange}
          ref={formRef}
        />

        <div className="submit-btn">
          <button className="submit" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployee;
