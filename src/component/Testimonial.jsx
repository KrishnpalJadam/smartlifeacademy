import React from 'react'
import { Link } from 'react-router-dom'

const Testimonial = () => {
    return (
        <div>
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <h4 className="section-title fs-1 fw-bold text-center"> Our Happy Users</h4>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-rating">★★★★★</div>
                            <p className="testimonial-text">"The AI coaching transformed my mindset completely. I've achieved more in 30 days than I did in the past year!"</p>
                            <div className="testimonial-author">
                                <img src="https://i.pravatar.cc/150?img=1" alt="User" className="author-image" />
                                <div className="author-info">
                                    <h4>Alex Thompson</h4>
                                    <p>Tech Entrepreneur</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-rating">★★★★★</div>
                            <p className="testimonial-text">"The book summaries are incredible. I can learn key concepts quickly and apply them to my business immediately."</p>
                            <div className="testimonial-author">
                                <img src="https://i.pravatar.cc/150?img=2" alt="User" className="author-image" />
                                <div className="author-info">
                                    <h4>Sarah Chen</h4>
                                    <p>Business Owner</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-rating">★★★★★</div>
                            <p className="testimonial-text">"The community support and accountability features kept me motivated throughout the 30-day challenge."</p>
                            <div className="testimonial-author">
                                <img src="https://i.pravatar.cc/150?img=3" alt="User" className="author-image" />
                                <div className="author-info">
                                    <h4>Michael Roberts</h4>
                                    <p>Life Coach</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/login" style={{display: "flex", justifyContent: "center"}}>
                    <button className="btn bnt-primary  fw-bold text-center mt-5">Join Now</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Testimonial
