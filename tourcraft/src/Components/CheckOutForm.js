import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CheckoutForm = () => {
<<<<<<< HEAD
  const [message, setMessage] = useState('');
  const { bookingId } = useParams();
=======
  const [message] = useState('');
  const { bookingId } = useParams(); 
>>>>>>> 7d02c7ee286b90be4499e566511b03739c05ac83

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Token not found');
      return;
    }

    try {
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Key e1efcb9caf0b48159a0a4bf5da0a3cfc'
        }
      });

      const response = await axiosInstance.post(`/users/bookings/${bookingId}/initiate_payment/`);
      window.location.replace(response.data.payment_url);
    } catch (error) {
      console.error('Error initiating payment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setMessage(`Error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setMessage('No response received from server');
      } else {
        console.error('Error details:', error.message);
        setMessage('An error occurred while initiating payment. Please try again.');
      }
    }
=======
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
>>>>>>> 7d02c7ee286b90be4499e566511b03739c05ac83
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Pay with Khalti</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
