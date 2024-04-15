import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReactToastify.css';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phonenumber: '',
    nationality:'',
    role: 'TRAVELER' // Default role set to 'Traveler'
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

  const handleSignup = () => {
    axios.post('http://127.0.0.1:8000/users/api/Customuser/', formData)
      .then(res => {
        console.log(res);
        toast('Sign Up Successful');
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to Sign Up');
      });
  };

  return (
    <div className='wrapperr'>
      <form>
        <h1>Register</h1>
        <div className="input-boxx">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /> </div>
        <div className="input-box1">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> </div>
        <div className="input-boxxx">
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /> </div>
        <div className="input-box2">
        <input type="text" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange} required />
        </div>
        <div className="input-boxxxx">
        <input type="text" name="nationality" placeholder="Nationality" value={formData.address} onChange={handleChange} required />
        </div>
        
        {/* Set the role field to "Traveler" */}
        <input type="hidden" name="role" value="TRAVELER" />
        <button onClick={handleSignup} type="button">Sign Up</button>
        <div className="login-link">
          <p>Already have an account? <a href="#">Login</a></p>
        </div>
      </form>
      {/* Error message for username existence */}
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
