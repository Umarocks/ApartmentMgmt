// http://localhost:3000/admin/getAllOwner
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../Table/Table";

function AllOwner() {
  const [OwnerInfor, setOwnerInfor] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios
          .get(`http://localhost:3000/admin/getAllOwner?${Date.now()}`, {
            withCredentials: true,
          })
          .then((response) => {
            setOwnerInfor(response.data); // Update the state with the fetched data
            console.log(response.data);
            console.log(OwnerInfor.length);
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
      <h1>Total Owner = {OwnerInfor.length}</h1>
      <div className="Table">
        {OwnerInfor.length > 0 && <Table data={OwnerInfor} />}
      </div>
    </>
  );
}

export default AllOwner;
