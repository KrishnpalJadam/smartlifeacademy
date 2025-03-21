import React from 'react';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import c from "../assets/c.jpg";
// import { MdHeight } from 'react-icons/md';

const SelfImprovementSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/hero'); // Replace with your actual route
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [navigate]);


  const sectionStyle = {
    // backgroundColor: '#111',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px'
  };

  const imageContainerStyle = {
    width: '100%',
    maxWidth: '350px',
    marginBottom: '30px'
  };

  const imageStyle = {
    width: '100%',
    height :"400px",
    borderRadius: '10px'
  };

  const headingStyle = {
    color: '#ffc107',
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '10px'
  };

  const subtextStyle = {
    fontSize: '16px',
    color: '#ccc',
    maxWidth: '600px'
  };

  return (
    <div style={sectionStyle}>
      {/* Image Section */}
      <div style={imageContainerStyle}>
        <img  src={c} border="0" 
          alt="Self Improvement Book & Phone" 
          style={imageStyle} />
      </div>

      {/* Text Section */}
      <h2 style={headingStyle}>
        Begin Your Journey to Self-Improvement
      </h2>

      <p style={subtextStyle}>
        You're about to discover a revolutionary approach to personal development.
        Get ready for a transformative experience!
      </p>
    </div>
  );
};

export default SelfImprovementSection;
