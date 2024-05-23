import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CheckoutForm = () => {
  const [message] = useState('');
  const { bookingId } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error('Token not found');
      }

    let axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Key e1efcb9caf0b48159a0a4bf5da0a3cfc'
      }
    })

    await axiosInstance.post(`/users/bookings/${bookingId}/initiate_payment/`)
      .then(res => {
        window.location.replace(res.data.payment_url);
      })
      .catch(e => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Pay with Khalti</button>
      {message && <p>{message}</p>}
    </form>

  );
};

export default CheckoutForm;