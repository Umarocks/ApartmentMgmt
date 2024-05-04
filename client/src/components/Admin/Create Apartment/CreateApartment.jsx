import React, { useState, useRef } from "react";
import axios from "axios";
// NEED TO TEST THIS COMPONENT
function CreateApartment() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    apt_no: "",
    bedrooms: "",
    type: "",
    area: "",
    floor: "",
    address: "",
    owner_email: "",
    block_name: "",
  });

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      apt_no: formRef.current.apt_no.value,
      bedrooms: formRef.current.bedrooms.value,
      type: formRef.current.type.value,
      area: formRef.current.area.value,
      floor: formRef.current.floor.value,
      address: formRef.current.address.value,
      owner_email: formRef.current.owner_email.value,
      block_name: formRef.current.block_name.value,
    };

    setFormData(updatedFormData);
    console.log(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/createApartment",
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
      <h2>Create Apartment</h2>
      {showSuccess && <div className="Green-Success">Apartment Created</div>}

      <form onSubmit={handleSubmit}>
        <label>Apt No:</label>
        <input
          type="text"
          name="apt_no"
          defaultValue={formData.apt_no}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          defaultValue={formData.bedrooms}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Type:</label>
        <select
          name="type"
          defaultValue={formData.type}
          onChange={handleChange}
          ref={formRef}
        >
          <option value="apartment">Apartment</option>
          <option value="penthouse">Penthouse</option>
          <option value="studio">Studio</option>
        </select>

        <label>Area (In Sq.Ft):</label>
        <input
          type="text"
          name="area"
          defaultValue={formData.area}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Floor:</label>
        <input
          type="number"
          name="floor"
          defaultValue={formData.floor}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          defaultValue={formData.address}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Owner Email:</label>
        <input
          type="email"
          name="owner_email"
          defaultValue={formData.owner_email}
          onChange={handleChange}
          ref={formRef}
        />

        <label>Block Name:</label>
        <input
          type="text"
          name="block_name"
          defaultValue={formData.block_name}
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

export default CreateApartment;
