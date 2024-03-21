import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './signup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    contact_number: '',
    nationality: ''
  });
  const [usernameExists, setUsernameExists] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    axios.post('http://127.0.0.1:8000/app/signup/', formData)
      .then(res => {
        console.log(res);
        toast.success('Sign Up Successful');
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.username) {
          setUsernameExists(true);
        } else {
          toast.error('Failed to Sign Up');
        }
      });
  };

  return (
    <div className='wrapperr'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-boxx">
          <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="input-box1">
          <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="input-boxx">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="input-box1">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-boxx">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="input-box1">
          <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} required />
        </div>
        <div className="input-boxx">
          <input type="text" name="contact_number" placeholder="Contact Number" value={formData.contact_number} onChange={handleChange} required />
        </div>
        <div className="input-box1">
          <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required />
        </div>
        <button type="submit" name="signup">Signup</button>
        <div className="login-link">
          <p>Already have an account? <a href="#">Login</a></p>
        </div>
      </form>
      {usernameExists && (
        <div className="popup">
          <p>Username already exists. Please choose a different one.</p>
          <button onClick={() => setUsernameExists(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
