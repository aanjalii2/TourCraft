import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DestinationSelect.css';
import { NavLink } from 'react-router-dom';


const DestinationSelect = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/destinations/', {
          headers: {
            Authorization: 'Bearer 5ecc482be127bd43cf8bef54224de3a676ff6498'
          }
        });
        setDestinations(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching destinations. Please try again later.');
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="destination-select-container">
      <h2>Destinations</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </div>
      <div className="destinations">
        {destinations.map(destination => (
          <div key={destination.name} className="destination-card">
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            {destination.image && <img src={`http://127.0.0.1:8000/users/images/`} alt={destination.name} />}
            <NavLink to="/bandipur">
              <button type="button">View Details</button>
              </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSelect;