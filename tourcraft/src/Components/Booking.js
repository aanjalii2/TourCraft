import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { destinationId, tripid } = useParams(); 

  useEffect(() => {
    // Log the token on component mount to verify it exists in localStorage
    const token = localStorage.getItem('token');
    console.log('Component mounted, token from localStorage:', token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log('Retrieved Token:', token); // Log the token for debugging

      if (!token) {
        throw new Error('Token not found');
      }

      const requestData = {
        user,
        destination: destinationId, // Use destinationId from URL
        trip: tripid, // Use tripId from URL
        phone,
        date,
      };

      const response = await axios.post('http://127.0.0.1:8000/users/bookings/', requestData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log('Booking submitted successfully:', response.data);
      toast.success('Booking submitted successfully');

      navigate(`/khalti/${response.data.id}`); // Redirect to confirmation page

      // Reset form fields
      setUser('');
      setPhone('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error submitting booking:', error);

      if (error.message === 'Token not found') {
        console.error('Token was not found in localStorage.');
        toast.error('Token not found. Please log in again.');
      } else if (error.response) {
        console.error('Server responded with:', error.response.data);
        toast.error(`Error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from server.');
      } else {
        console.error('Error in setting up the request:', error.message);
        toast.error('Request setup error.');
      }
    }
  };

  return (
    <div className="booking-page-wrapper">
      <form onSubmit={handleSubmit}>
        <h2 className="booking-heading">Booking Form</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destinationId}
          readOnly // Make the destination field read-only
          required
        />
        <label htmlFor="trip">Trip:</label>
        <input
          type="text"
          id="trip"
          value={tripid}
          readOnly // Make the trip field read-only
          required
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="booking-button">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;
