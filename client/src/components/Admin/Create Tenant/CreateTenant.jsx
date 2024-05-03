import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CreateTenant.css";
import Table from "../../Table/Table";

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
  // {
  //   email: 'umar@gmail.com',
  //   password: 'admin1234',
  //   name: 'SHREIYA TEST',
  //   ssn: '123532556',
  //   phone_no: '1234568763',
  //   address: 'clear LAKE'
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      name: formRef.current.name.value,
      ssn: formRef.current.ssn.value,
      phone_no: formRef.current.phone_no.value,
      age: formRef.current.Age.value,
      perm_address: formRef.current.perm_address.value,
      apt_no: formRef.current.apt_no.value,
      block_name: formRef.current.block_name.value,
      apt_address: formRef.current.apt_address.value,
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

  const [AptInfor, setAptInfo] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios
          .get(
            `http://localhost:3000/admin/getAllVacantApartments?${Date.now()}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setAptInfo(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div
      className="Create-Tenant"
      style={{
        display: "Flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div className="VacanyTable" style={{ padding: "5rem" }}>
        {AptInfor && AptInfor.length > 0 && <Table data={AptInfor} />}
      </div>
      <div className="form">
        <h2>Create Tenant</h2>
        {showSuccess && <div className="Green-Success">Tenant Created</div>}

        <form ref={formRef} onSubmit={handleSubmit}>
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            defaultValue={formData.email}
            onChange={handleChange}
          />
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            defaultValue={formData.password}
            onChange={handleChange}
          />
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
          />
          <label className="form-label">SSN:</label>
          <input
            type="text"
            name="ssn"
            defaultValue={formData.ssn}
            onChange={handleChange}
          />
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            name="phone_no"
            defaultValue={formData.phone_no}
            onChange={handleChange}
          />
          <label className="form-label">Age:</label>
          <input
            type="number"
            name="Age"
            defaultValue={formData.Age}
            onChange={handleChange}
          />
          <label className="form-label">Permanent Address:</label>
          <input
            type="text"
            name="perm_address"
            defaultValue={formData.perm_address}
            onChange={handleChange}
          />
          <label className="form-label">Apartment Number:</label>
          <input
            type="text"
            name="apt_no"
            defaultValue={formData.apt_no}
            onChange={handleChange}
          />
          <label className="form-label">Block Name:</label>
          <input
            type="text"
            name="block_name"
            defaultValue={formData.block_name}
            onChange={handleChange}
          />
          <label className="form-label">Apartment Address:</label>
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
    </div>
  );
}

export default CreateTenant;
