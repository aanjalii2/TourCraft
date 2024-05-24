import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Destination.css';
import { useParams } from 'react-router-dom';
import image3 from "../Assets/image3.png";
import image33 from "../Assets/image33.png";
import { NavLink } from 'react-router-dom';

const TripInformation = ({ trip }) => {
  const { destinationId } = useParams();
  return (
    <div className="trip-info-container">
      <h2>Trip Information</h2>
      <div>
        <p><strong>Destination:</strong> {destinationId}</p>
        <p><strong>Trip Duration:</strong> {trip.trip_duration}</p>
        <p><strong>Max. Altitude:</strong> {trip.max_altitude}</p>
        <p><strong>Trip Type:</strong> {trip.trip_type}</p>
        <p><strong>Transport:</strong> {trip.transport}</p>
        <p><strong>Cost:</strong> {trip.cost}</p>
        <h3>Highlights</h3>
        <ul>
          <li>Exquisite views of the world's famous mountain peaks</li>
          <li>Scenic flight over the Himalayas</li>
          <li>Very less tiring journey giving you more energy to explore nature</li>
        </ul>
        <NavLink to={`/booking/${destinationId}/${trip.id}`}>
          <button className="secondary-buttonn">
            Book Now
          </button>
        </NavLink>
      </div>
    </div>
  );
};

const Destination3 = () => {
  const { name } = useParams();
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
        const response = await axios.get('http://127.0.0.1:8000/users/destinations/');
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
    <div className="home-containerr">
      <div className="home-banner-containerr">
        <div className="home-text-sectionn">
          <h1 className="primary-headingg">
            {name}
          </h1>
          {destinations.map(destination => (
            <div key={destination.id}>
              <h3>{destination.description}</h3>
            </div>
          ))}
        </div>
        <div className="home-image-sectionnn">
          <img src={image3} alt="Destination" />
        </div>
        <div className="home-image-sectionn">
          <img src={image33} alt="Destination" />
        </div>
      </div>
      <div className="home-contentt">
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
