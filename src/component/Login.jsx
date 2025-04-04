import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../Config';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      console.log("Login Response:", response.data.data);

      if (response.data.success) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('Role', response.data.role);
             localStorage.setItem("userdata", JSON.stringify(response.data.data) )
            if (response.data.role === 'admin') {
              navigate('/dashboard');
            } else if (response.data.role === 'user') {
              navigate('/dashboard');
            } else {
              setError('Unknown user role');
            }
          }
        });
      } else {
        toast.error("Invalid login credentials", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error("Error logging in. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <button className="btn btn-primary mt-5">
        <Link to="/hero"><i className="fa-solid fa-left-long me-2"></i> Home</Link>
      </button>

      <div className="dark-signup-page">
        <div className="dark-signup-container row">
          <div className="col-sm-6">
            <div className="dark-logo-section">
              <img src="https://i.ibb.co/KcmSMwgF/smart-life-academy-logo.jpg" alt="Logo" className="book-logo" />
            </div>
          </div>

          <div className="dark-form-section col-sm-6">
            <h1 className="text-yellow">Login Here</h1>
            <form onSubmit={handleSubmit} className="dark-signup-form">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="dark-input" />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="dark-input" />
              <Link style={{ color: '#fcd34d' }} to="/signup">Don't have an account?</Link>
              <button type="submit" className="dark-get-started-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;