// http://localhost:3000/admin/getAllOwner
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../Table/Table";

function AllOwner() {
  const [ComplaintInfor, setComplaintInfor] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios
          .get(`http://localhost:3000/admin/getAllComplaint?${Date.now()}`, {
            withCredentials: true,
          })
          .then((response) => {
            setComplaintInfor(response.data); // Update the state with the fetched data
            console.log(response.data);
            console.log(ComplaintInfor.length);
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
    <>
      <h1>Total Complaint = {ComplaintInfor.length}</h1>
      <div className="Table">
        {ComplaintInfor.length > 0 && <Table data={ComplaintInfor} />}
      </div>
    </>
  );
}

export default AllOwner;
