import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../Table/Table";

function ViewProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios
          .get(`http://localhost:3000/owner/viewproperties?${Date.now()}`, {
            withCredentials: true,
          })
          .then((response) => {
            setProperties(response.data); // Update the state with the fetched data
            console.log(response.data);
            console.log(properties.length);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }, []);

  return (
    <>
      <h1>Total Properties = {properties.length}</h1>
      <div className="Table">
        {properties.length > 0 ? (
          <Table data={properties} />
        ) : (
          <p>No properties available.</p>
        )}
      </div>
    </>
  );
}

export default ViewProperties;
