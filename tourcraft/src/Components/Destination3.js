import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Destination.css';
import { useParams } from 'react-router-dom';
import image3 from "../Assets/image3.png";
import image33 from "../Assets/image33.png";
import { NavLink } from 'react-router-dom';

const TripInformation = ({ trip }) => {
  const { destinationId } = useParams();
  // const { tripid } = useParams();
  return (
    <div className="w">
      <h2>Trip Information</h2>
      <div>
        <p>Destination: {destinationId}</p>
        <p>Trip Duration: {trip.trip_duration}</p>
        <p>Max. Altitude: {trip.max_altitude}</p>
        <p>Trip Type: {trip.trip_type}</p>
        <p>Transport: {trip.transport}</p>
        <p>Cost: {trip.cost}</p>
        <h3>Highlights</h3>
        <p>
          'Exquisite views of the world\'s famous mountain peaks',
          'Scenic flight over the Himalayas',
          'Very less tiring journey giving you more energy to explore nature'
        </p>
        <NavLink to={`/booking/${destinationId}/${trip.id}`}>
          <button className="secondary-button">
            Book Now
          </button>
        </NavLink>
        
      </div>
    </div>
  );
};

const Destination3 = () => {
  const { name } = useParams();
  const { destinationId } = useParams();

  const { description } = useParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/trips/?destination_name=${name}`);
        if (response.data.length > 0) {
          setTripData(response.data[0]);
        } else {
          setError('No trips found for this destination.');
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setError('Error fetching trip data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/destinations/', {
          
        });
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setError('Error fetching destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
    fetchDestinations();
  }, [name]);

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            {name}
          </h1>
          {destinations.map(destination => (
            <div key={destination.id}>
              <h3>{destination.description}</h3>
            </div>
          ))}
        </div>
        <div className="home-image-section">
          <img src={image3} alt="" />
        </div>
        <div className="home-image-sectionn">
          <img src={image33} alt="" />
        </div>
      </div>
      <div className="home-content">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <TripInformation trip={tripData} />
        )}
      </div>
    </div>
  );
};

export default Destination3;