import React, { useState, useRef } from "react";
import axios from "axios";
function CreateAdmin() {
  const [formData, setFormData] = useState();

  const formRef = useRef({});

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
      phone: formRef.current.phone.value,
      shift_timings: formRef.current.shift_timings.value,
    };
    setFormData(updatedFormData);

    // ...

    await axios
      .post("http://localhost:3000/admin/createAdmin", formData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle success
        console.log(response.data);
        setShowSuccess(!showSuccess);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    // ...
  };

  return (
    <div>
      <h2>Create Admin</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />

        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label>Phone:</label>
        <input type="text" name="phone" onChange={handleChange} />

        <label>Shift Timings:</label>
        <input type="text" name="shift_timings" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
      {showSuccess && <div className="Green-Success">Admin Created</div>}
    </div>
  );
}

export default CreateAdmin;
