import React, { useState } from 'react';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import axios from 'axios';
import './stripe.css'; 

// Your publishable key from Stripe
const stripePromise = loadStripe('pk_test_51PBGjISISl0vzfh8QGBNNtreHTULMsu0L0vJzvQD3UfYD92fs3FeOqchN3anlkTI7EIA7lsi2lsJcI1R1eZ7iVNU00pckPGdc1');

const Stripe = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Create a checkout session.
    try {
      const response = await axios.post('http://localhost:8000/create-checkout-session/', {
        email: email,
        amount: 1000, // Amount in cents
      });

      const session = response.data;

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          className="form-input"
          id="email"
          name="email"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <button type="submit" className="submit-btn" disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <Stripe />
  </Elements>
);

export default App;
