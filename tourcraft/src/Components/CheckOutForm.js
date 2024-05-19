import React, { useState } from 'react';
import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [message] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      "return_url": "https://example.com/payment/",
      "website_url": "https://example.com/",
      "amount": 13000,
      "purchase_order_id": "test12",
      "purchase_order_name": "test",
      "customer_info": {
        "name": "Khalti Bahadur",
        "email": "example@gmail.com",
        "phone": "9800000123"
      }
    }

    let axiosInstance = axios.create({
      baseURL: "https://a.khalti.com/api/v2/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Key e1efcb9caf0b48159a0a4bf5da0a3cfc'
      }
    })

    await axiosInstance.post("/epayment/initiate/", formData)
      .then(res => {
        // console.log(res.data.payment_url);
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