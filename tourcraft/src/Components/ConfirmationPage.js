import React from 'react';
import { NavLink } from 'react-router-dom';
import './Confirmation.css'; // You can define your confirmation page styles in this CSS file

const ConfirmationPage = () => {
  return (
    <div className='confirmation-container'>
      <h1>Thank You!</h1>
      <p>Your Payment has been done successfully.</p>
      <p>We appreciate your input!</p>
      <NavLink to="/feedback">Give Feedback</NavLink>
    </div>
  );
}

export default ConfirmationPage;
