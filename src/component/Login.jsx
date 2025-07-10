import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../Config';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("loginPageReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("loginPageReloaded", "true");
      setTimeout(() => {
        window.location.reload();
      }, 100); // Delay to ensure sessionStorage is saved before reload
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      // console.log("Login Response:", response.data.data);

      if (response.data.success) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            localStorage.setItem('id', response.data.data.id);
            localStorage.setItem('plan_name', response.data.data.plan_name);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('Role', response.data.role);
            localStorage.setItem("userdata", JSON.stringify(response.data.data))
            localStorage.setItem("isLoggedIn", "true");

            if (response.data.role === 'admin') {
              navigate('/backdashboard');
               window.location.reload()
            } else if (response.data.role === 'user') {
              navigate('/backdashboard');
               window.location.reload()
            } else {
              setError('Unknown user role');
            }
            window.location.reload()
          }
        });
      } else {
        toast.error("Invalid login credentials", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response && error.response.status === 403) {
        const errorMessage = error.response.data?.message || "";
        if (errorMessage.includes("already logged in")) {
          toast.error("You are already logged in on another device.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("Access denied. Please check your credentials or contact support.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Error logging in. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }

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