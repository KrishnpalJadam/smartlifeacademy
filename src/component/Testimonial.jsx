import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../Config";
import { FaComments } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Testimonial = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [challengeUsers, setChallengeUsers] = useState([]);
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "20px",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              centerMode: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerMode: false
            }
          }
        ]
      };
      

    const getChallengeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getReviewsApproved`);

            if (response.data && Array.isArray(response.data.data)) {
                setChallengeUsers(response.data.data);
            } else {
                setChallengeUsers([]);
            }
        } catch (error) {
            console.error("Error fetching challenge data:", error);
            setChallengeUsers([]);
        }
    };

    useEffect(() => {
        getChallengeData();
    }, []);

    // Search Filter for Testimonials
    const filteredChallengeUsers = challengeUsers.filter((user) =>
        (user.firstname || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <h4 className="section-title fs-1 fw-bold text-center">Our Happy Users</h4>
                    
                    <div className="testimonials-grid">
                    <Slider {...settings}>
                        {filteredChallengeUsers.length > 0 ? (   
                            filteredChallengeUsers.map((review, index) => (
                                <div key={review.id} className="testimonial-card">
                                    <div className="testimonial-rating">
                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                    </div>
                                     <div style={{display:"flex",gap:"10px"}}>
                                     <FaComments   style={{ color:"yellow"}} className="text-2xl" />
                                    <p className="testimonial-text">{review.comment}</p>

                                     </div>
                                    <div className="testimonial-author">
                                        <img 
                                            src={`https://i.pravatar.cc/150?img=${index + 1}`} 
                                            alt={review.firstname} 
                                            className="author-image" 
                                        />
                                        <div className="author-info">
                                            <h4>{review.firstname || "Anonymous"}</h4>
                                            <p>Reader of "{review.book_name}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-reviews">No reviews available</p>
                        )}
                        </Slider>
                    </div>
                    <Link to="/login" style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-primary fw-bold text-center mt-5">Join Now</button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
