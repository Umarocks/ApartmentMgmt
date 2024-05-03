import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../Table/Table'
import { useOutlet } from "react-router-dom";

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/owner/viewProperties',  {withCredentials: true}); 
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to fetch properties');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);
const outlet = useOutlet();

  return (
    <div className="properties-container">
    <div className="dashboard">
      <div className="content">
        <div className="header">
          <h1>View Properties</h1>
        </div>
        <div className="table">
          {!outlet && !loading && properties.length > 0 ? (
            <Table data={properties} />
          ) : loading ? (
            <p>Loading properties...</p>
          ) : (
            <p>{error || "No properties available"}</p>
          )}
        </div>
      </div>
    </div>
  </div>

  );
}

export default ViewProperties;
