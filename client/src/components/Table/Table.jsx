import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import "./Table.css";

const Table = ({ data }) => {
  // Get the attributes of the first object in the data array
  const attributes = Object.keys(data[0]);
  console.log(attributes);
  return (
    <table
      className="table table-striped table-dark"
      style={{ margin: "20px" }}
    >
      <thead>
        <tr>
          {attributes.map((attribute, index) => (
            <th key={index}>{attribute}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {attributes.map((attribute, index) => (
              <td key={index}>{item[attribute]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
