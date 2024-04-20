import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBill, faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className="home">
        {/* <h1>Welcome to Apartment Management System</h1> */}
        <div className="sidebar">
        <h2 className='logo'>Apartment.co</h2>
              <ul>
                   <li className='login'>
                <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
                <span style={{ marginLeft: '8px' }}>Login</span>
                </Link>
            </li>
            <li className='signup'>
                <Link to="/signup">
                <FontAwesomeIcon icon={faUser} />
                <span style={{ marginLeft: '8px' }}>Sign Up</span>
                </Link>
            </li>
            <li className='payrent'>
                <Link to="/pay-rent">
                <FontAwesomeIcon icon={faMoneyBill} />
                <span style={{ marginLeft: '8px' }}>Pay Rent</span>
                </Link>
            </li>
            <li className='filecomplaint'>
                <Link to="/file-complaint">
                <FontAwesomeIcon icon={faCheck}/>
                <span style={{ marginLeft: '8px' }}>File Complaint</span>
                </Link>
            </li>
        </ul>
        </div>
  </div>
  )
}

export default Sidebar