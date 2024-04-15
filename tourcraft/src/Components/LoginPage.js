import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/users/login/', formData)
      .then(res => {
        console.log(res);
        toast.success('Logged in Successful');
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };

  return (
    <div className='wrapperrrr'>
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
          <FaLock className='icon'/>
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button onClick={handleSubmit} type="button">Login</button>
        <div className="register-link">
          <p>Don't have an account? <NavLink to="/signup">Register</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
