import React, { useState, useRef } from "react";
import axios from "axios";

function CreateOwner() {
  const [formData, setFormData] = useState({
    block_name: "",
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
      block_name: formRef.current.block_name.value,
      address: formRef.current.address.value,
    };

    // setFormData(updatedFormData);
    // console.log(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/createBlock",
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
      {showSuccess && <div className="Green-Success">Block Created</div>}

      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Block Name</label>
        <input
          type="text"
          name="block_name"
          defaultValue={formData.block_name}
          onChange={handleChange}
        />

        <label>Block Address:</label>
        <input
          type="text"
          name="address"
          defaultValue={formData.address}
          onChange={handleChange}
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

export default CreateOwner;
