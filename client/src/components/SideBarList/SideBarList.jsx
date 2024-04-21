import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faMoneyBill,
//   faExclamationTriangle,
//   faCheck,
// } from "@fortawesome/free-solid-svg-icons";
function SideBarList(props) {
  return (
    <li className="login">
      <Link to={props.link}>
        <FontAwesomeIcon icon={props.faValue} />
        <span style={{ marginLeft: "8px" }}>{props.value}</span>
      </Link>
    </li>
  );
}

export default SideBarList;
