import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUserName, selectEmail } from '../app/slices/authSlice';
import { NavLink } from 'react-router-dom'; // Adjust the path as necessary

import './Feedback.css';

const Feedback = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    date: new Date().toISOString().split('T')[0] // Get today's date in "YYYY-MM-DD" format
  });

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      name: userName ? decodeURIComponent(userName) : '',
      email: userEmail ? decodeURIComponent(userEmail) : ''
    }));
  }, [userName, userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/feedback/feedback/', formData);

      console.log('Feedback submitted successfully:', response.data);
      
      toast.success('Feedback submitted successfully');
      
      // Clear the form after successful submission
      setFormData({
        name: userName ? decodeURIComponent(userName) : '',
        email: userEmail ? decodeURIComponent(userEmail) : '',
        message: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);

      toast.error('An error occurred while submitting the feedback.');
    }
  };

  return (
    <div className="feedback-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        
        <NavLink to={`/`}>
        <button type="submit">Submit</button>
            </NavLink>
      </form>
    </div>
  );
};

export default Feedback;
