import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from "react-icons/fa";
import './login.css';
import { setInitialCredentials } from '../app/slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/api/auth_user/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      dispatch(setInitialCredentials({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        phonenumber: response.data.phonenumber,
        nationality: response.data.nationality,
        token: token,
        isAuthenticated: true
      }));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Failed to fetch user data");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login/', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      fetchData(token);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong with login");
    }
  };

  return (
    <div className='wrapperrrr'>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
          <FaLock className='icon' />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <NavLink to="/signup">Register</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
