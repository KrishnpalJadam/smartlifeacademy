import React, { useState } from "react";
import logo from "../assets/logo.jpg"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../Config";

function MasterClassSignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '' });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/saveUserVisited`, {
        Uemail: formData.email, // 👈 Yehi tumhara correct key hai
      });
      console.log("Submitted:", response.data);
      // Optionally clear form
      setFormData({ email: "" });
      navigate("/selfimprovement")
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    // bg-dark
    <div className="container-fluid bg-black min-vh-100 d-flex justify-content-center align-items-center p-3">
      <div
        className="text-center p-3"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="smart-life-academy-logo"
          className="img-fluid mb-3"
        />

        {/* Heading and Description */}
        <h1 style={{ color: "#ffd24c", fontSize: "clamp(1.5rem, 6vw, 2.5rem)" }}>
          Smart Life Academy
        </h1>
        <p style={{ color: "#a1a1aa", fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
          Transform your life in just 30 days with our AI-powered life improvement
          system. Gain financial freedom, build meaningful relationships, and
          achieve your life goals with just 20 minutes a day.
        </p>

        {/* Masterclass Information */}
        <div className="mt-4">
          <h6 style={{ color: "white", fontSize: "clamp(1rem, 4vw, 1.25rem)" }}>
            Get Access to Our Free Masterclass
          </h6>
          <p style={{ color: "#a1a1aa", fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>
            Learn how to transform your life in 30 days using carefully curated
            self-help book summaries and our AI-powered Life Coach. Start your
            journey to a better life today!
          </p>
        </div>

        {/* Input and Button - Responsive */}
        {/* <Link to={"/selfimprovement"}> */}
        <form onSubmit={handelSubmit}>
          <div className="d-flex flex-column gap-2 align-items-center">
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
              className="form-control custom-input"
              style={{
                backgroundColor: "#27272a",
                color: "white",
                border: "1px solid #a1a1aa",
                maxWidth: "100%",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "clamp(0.8rem, 3vw, 1rem)",
              }}
            />


            <button type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#ffd24c",
                color: "black",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
              }}
            >
              Get Free Masterclass Access
            </button>
          </div>
        </form>
        {/* </Link> */}

        <p
          style={{
            color: "#a1a1aa",
            fontSize: "clamp(0.8rem, 3vw, 1rem)",
            marginTop: "1rem",
          }}
        >
          By entering your email, you'll receive access to our exclusive
          masterclass and occasional updates about our program. You can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

export default MasterClassSignUp;