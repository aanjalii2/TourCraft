// Booking.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
  const [user, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/users/bookings/', {
        user,
        phone,
        date: date.toISOString().split('T')[0],
        destination,
      });

      console.log('Booking submitted successfully:', response.data);
      alert('Booking submitted successfully!');
    
      setEmail('');
      setPhone('');
      setDestination('');
      setDate(new Date());
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred while submitting the booking.');
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
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destination} // Pre-filled destination (adjust if needed)
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date.toISOString().split('T')[0]} // Format date for input
          onChange={(e) => setDate(new Date(e.target.value))}
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
