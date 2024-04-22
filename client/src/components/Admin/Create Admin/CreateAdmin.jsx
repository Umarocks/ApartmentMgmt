import React, { useState, useRef } from "react";

function CreateAdmin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    shift_timings: "9:00 AM - 5:00 PM",
  });

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      name: formRef.current.name.value,
      phone: formRef.current.phone.value,
      shift_timings: formRef.current.shift_timings.value,
    };
    setFormData(updatedFormData);

    console.log(updatedFormData);
  };

  return (
    <div>
      <h2>Create Admin</h2>
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

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          defaultValue={formData.phone}
          onChange={handleChange}
        />

        <label>Shift Timings:</label>
        <input
          type="text"
          name="shift_timings"
          defaultValue={formData.shift_timings}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateAdmin;
