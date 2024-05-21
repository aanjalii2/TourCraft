import React, { useState } from 'react';
import axios from 'axios';
import './Booking.css';
import { toast } from 'react-toastify';

const Booking = () => {
  const [user, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [trip, setTrip] = useState('');
  const [phone, setPhone] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); 

      const requestData = {
        user: user,
        destination: destination,
        trip: trip,
        phone: phone,
        cost: cost,
        date: date,
      };

      const response = await axios.post('http://127.0.0.1:8000/users/bookings/', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Booking submitted successfully:', response.data);
      toast.success('Booking submitted successfully');

      setEmail('');
      setDestination('');
      setTrip('');
      setPhone('');
      setCost('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error submitting booking:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
       
        console.error('Error in setting up the request:', error.message);
      }
      toast.error('An error occurred while submitting the booking.');
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <label htmlFor="trip">Trip:</label>
        <input
          type="text"
          id="trip"
          value={trip}
          onChange={(e) => setTrip(e.target.value)}
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
        <label htmlFor="cost">Cost:</label>
        <input
          type="text"
          id="cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
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
