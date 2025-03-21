import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Contact = () => {
    return (
        <div>
            <Header/>
            <div className="container contact-container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="fw-bold text-white">Contact Us</h2>
                        <p className="my-4 text-white">
                            Reading is considered as the most intelligent habit. Reading is
                            intelligent but it's also enriching, soothing, escapist, inspirational,
                            transformative and a timeless journey.
                        </p>
                        <div className="contact-info mt-4 text-white">
                            <p className='mb-3'>
                                <i className="fa-solid fa-phone me-3" /> Phone Number:{" "}
                                <a href="tel:+44 123 4567 890">+44 123 4567 890</a>
                            </p>
                            <p className='mb-3'>
                                <i className="fa-solid fa-envelope me-3" /> Email:{" "}
                                <a href="book@bookchor.com">book@book.com</a>
                            </p>
                            <p className='mb-3'>
                                <i className="fa-solid fa-location-dot me-3" /> Our Location:{" "}
                                <strong>123 USA</strong>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div
                            className="contact-form shadow  text-white"
                            style={{ backgroundColor: "#1a1a1a" }}
                        >
                            <h4 className="fw-bold mb-4">Send Message</h4>
                            <form>
                                <div className="mb-4">
                                    <input type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="mb-4">
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        placeholder="Write your message"
                                        defaultValue={""}
                                    />
                                </div>
                                <button type="submit" className="btn btn-orange w-100">
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact
