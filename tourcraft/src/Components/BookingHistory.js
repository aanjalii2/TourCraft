import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectToken, selectEmail } from '../app/slices/authSlice'; // Adjust the path as necessary
// import './BookingHistory.css'; // Create a CSS file for styling

const BookingHistory = () => {
  const token = useSelector(selectToken);
  const userEmail = useSelector(selectEmail);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookingHistory = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/users/bookings/${userEmail}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booking history:', error);
      toast.error('Error fetching booking history');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userEmail) {
      fetchBookingHistory();
    }
  }, [token, userEmail]);

  // Render booking history as before
};

export default BookingHistory;
