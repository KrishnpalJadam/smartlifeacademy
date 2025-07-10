import React from 'react';
import DAEB7A1 from "../assets/DAEB7A1.jpg"
import DALLE2_1 from "../assets/DALLE2_1.jpg"
import b from "../assets/home2.mp4"
import Header from "../component/Header"
import { Link } from 'react-router-dom';
import e from "../assets/homevideo.mp4"
import Footer from '../component/Footer';
import Testimonial from '../component/Testimonial';
import Chatbot from '../Dashboard/Chatbot';
import MainSalesChatbot from '../Dashboard/Userpages/MainSalesChatbot';
import ReviewSlider from '../component/ReviewSlider';
import Faqs from './Faqs';
const Hero = () => {
  const features = [
    {
      title: "AI-Powered Life Coach",
      description: "Speed up your learning and implement key principles with personalized AI guidance"
    },
    {
      title: "Audio Summaries",
      description: "Access concentrated wisdom from life-changing books in minutes"
    },
    {
      title: "30-Day Transformation",
      description: "Follow our proven system to achieve lasting change in just 30 days"
    }
  ];
  const transformationFeatures = [
    "Daily book summaries and action items",
    "AI-guided implementation",
    "Progress tracking and milestones",
    "Community support and accountability"
  ];
  return (
    <>
      <Header />
      <div className="hero-section" >
        <div className="hero-content">
          <div className="text-content">
            <h1 className="hero-title">Transform Your Life in 30 Days</h1>
            <p className="hero-description">
              Complete our 30-day challenge: Listen to 30 books, engage with AI coaching,
              and if you successfully complete the challenge, get 11 months of free access to continue your transformation journey!
            </p>
          </div>
          <div className="hero-image">
            <video width="100%" autoPlay loop muted playsInline>
              <source src={e} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div>
        </div>
      </div>
      {/* testimonial section start */}
      <Testimonial />
      {/* Feature Cards */}
      {/* <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div> */}

      {/* Previous sections remain unchanged */}
      <section className="transformation-section">


        <h2 className="financial-title mb-12">What is SLA?</h2>
        <div className="transformation-container">
          <div className="transformation-content">
            <h2 className="section-title">30 Days to a New You</h2>
            <p className="section-description">
              Transform your life in just 30 days with our structured program. Each day brings new insights, practical
              wisdom, and measurable progress. Our AI coach ensures you stay on track and implement what you
              learn effectively.
            </p>
            <div className="features-list">
              {transformationFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="checkmark">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={"/signup"}>
              <button className="cta-button">
                Start Your Transformation
              </button></Link>
          </div>




          <div className="transformation-image">
            <video width="100%" autoPlay loop muted playsInline>
              <source src={b} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>





        </div>
      </section>
      {/* Other sections remain unchanged */}

      {/* FinancialFreedom */}
      <section className="financial-section">
        <div className="financial-content">
          <h2 className="financial-title">Who it’s forSmart Life Academy?</h2>
          <div className="financial-image-container">
            <img
              src={DAEB7A1}
              alt="Financial Growth Tree"
              className="financial-image"
            />
            <p className="hero-description">
              Smart Life Academy is designed for individuals who are committed to personal growth, productivity, and success. Whether you are a student, a working professional, an entrepreneur, or someone looking to improve different aspects of your life, this program is tailored to help you achieve your goals efficiently.
            </p>
            <Link to={"/signup"}>
              <button className="btn btn-primary mt-4">
                Join Now
              </button></Link>
          </div>
        </div>
      </section>



      {/* UnlockPotential */}
      <section className="unlock-section">
        <div className="unlock-container">
          <div className="unlock-content">
            <h2 className="unlock-title"> How it Works?</h2>
            <p className="unlock-description">
              Smart Life Academy is a structured 30-day program designed to help you unlock your full potential through guided learning, AI-powered insights, and actionable steps. The process is simple yet highly effective, requiring just 15-20 minutes a day to create lasting change.
            </p>
            <Link to={"/signup"}>
              <button className="start-button">
                Start Your Transformation
              </button></Link>
          </div>
          <div className="book-image">
            <img src="https://i.ibb.co/WvMW3d63/7c4e53fe-c731-4242-99b1-5adeda91e80f.jpg" alt="Book Cover" />
          </div>
        </div>
      </section>


      {/* why is this program unique  */}
      <section className="unlock-section">
        <div className="unlock-container">
          <div className="book-image">
            <img src="https://i.ibb.co/qGXNVB5/a6a89160-55e4-49d7-9a52-03088fb6c673.jpg" alt="Book Cover" />
          </div>
          <div className="unlock-content">
            <h2 className="unlock-title"> Why is This Program Unique?</h2>
            <p className="unlock-description">
              Smart Life Academy stands apart from other self-improvement programs because it offers a complete, AI-driven transformation system. Unlike traditional learning methods that focus only on information, this program ensures real-world application, progress tracking, and accountability, making your transformation fast, structured, and effective.
            </p>
            <Link to={"/signup"}>
              <button className="start-button">
                Join Now
              </button></Link>
          </div>

        </div>
      </section>



      {/* what 30 days chlanges section */}
      <section className="unlock-section">
        <div className="unlock-container">

          <div className="unlock-content">
            <h2 className="unlock-title"> What’s the 30-Day Challenge?</h2>
            <p className="unlock-description">
              The 30-Day Challenge by Smart Life Academy is a structured, step-by-step transformation journey designed to create lasting personal and professional growth. This challenge is not just about learning—it’s about real implementation through AI-guided exercises, daily action steps, and community support. <br />
              ✅ Daily Structured Learning:
              <br />

              ✅ AI-Powered Action Steps:
              <br />

              ✅ Progress Tracking System:
              <br />
              ✅ Real Transformation in 30 Days
            </p>
            <Link to={"/signup"}>
              <button className="start-button">
                Join Now
              </button></Link>
          </div>
          <div className="book-image">
            <img src="https://i.ibb.co/PZKvqr93/bb9a6c5e-8140-43a5-a770-6e2b4fd28351.jpg" alt="Book Cover" />
          </div>
        </div>
      </section>



      {/* how you can make money to  */}
      <section className="unlock-section">
        <div className="unlock-container">
          <div className="book-image">
            <img src="https://i.ibb.co/S79cmN1k/e23a3057-7618-4025-ad99-54045759bb16.jpg" alt="Book Cover" />
          </div>
          <div className="unlock-content">
            <h2 className="unlock-title">How You Can Make Money Too?</h2>

            <p className="unlock-description">
              Smart Life Academy isn’t just about learning—it’s about growing financially. This program provides multiple opportunities to make money while learning. Whether you are looking for extra income, freelancing, or starting a business, this academy gives you the right tools and network to succeed.
            </p>
            <Link to={"/signup"}>
              <button className="start-button">
                Join Now
              </button></Link>
          </div>

        </div>
      </section>

<Faqs/>

      <section id="call-to-action" class="text-center bg-dark text-white py-5">
        <div class="container">

          <h2 className="unlock-title">Join Our Program Now!</h2>
          <p class="lead mt-3 unlock-description">
            Unlock your full potential with our AI-powered learning system. <br /> Take the
            <strong>30-Day Challenge</strong>, grow with a  supportive community, <br /> and start
            earning while learning. Your journey towards success begins today!
          </p>
          <Link to={"/signup"}>
            <button className="start-button mt-3">
              Join Now
            </button></Link>
        </div>
      </section>


      {/* <MainSalesChatbot/> */}
    
      <Footer />


    </>

  );
};

export default Hero;