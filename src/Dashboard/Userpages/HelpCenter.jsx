import React, { useState } from "react";
import { FaTools, FaClipboardList, FaInfoCircle, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function HelpCenter() {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleOpenModal = (url) => {
    setVideoUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoUrl("");
  };

  const videos = [
    { title: "How to Use the System", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "How to Earn Commissions", url: "https://www.youtube.com/embed/IwzUs1IMdyQ" },
    { title: "How to Join 30-Day Challenge", url: "https://www.youtube.com/embed/Uj1ykZWtPYI" },
    { title: "How to Switch Plans", url: "https://www.youtube.com/embed/oHg5SJYRHA0" },
    { title: "How to Submit & View Comments", url: "https://www.youtube.com/embed/6_b7RDuLwcI" }
  ];

  return (
    <div className="container-fluid min-vh-100 text-light py-4" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="container">
        <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
        <h2 className="fs-4 fw-semibold mt-3">Help Center</h2>

        <div className="row g-3 mt-4">
          {/* Technical Problems */}
          <div className="col-12 col-md-6">
            <div className="p-3 bg-secondary text-light rounded d-flex align-items-center h-100">
              <FaTools className="text-warning fs-3 me-3" />
              <div>
                <h3 className="fs-5 fw-medium">Technical Problems</h3>
                <p className="text-muted small">Get help with technical issues and platform usage</p>
              </div>
            </div>
          </div>

          {/* Plans and Subscription */}
          <div className="col-12 col-md-6">
            <div className="p-3 bg-secondary text-light rounded d-flex align-items-center h-100">
              <FaClipboardList className="text-success fs-3 me-3" />
              <div>
                <h3 className="fs-5 fw-medium">Plans and Subscription</h3>
                <p className="text-muted small">Information about our plans, pricing, and billing</p>
              </div>
            </div>
          </div>

          {/* General Inquiries */}
          <div className="col-12">
            <div className="p-3 bg-secondary text-light rounded d-flex align-items-center">
              <FaInfoCircle className="text-primary fs-3 me-3" />
              <div>
                <h3 className="fs-5 fw-medium">General Inquiries</h3>
                <p className="text-muted small">General questions about Smart Life Academy</p>
              </div>
            </div>
          </div>

          {/* Educational Videos */}
          <div className="col-12">
            <div className="bg-dark p-4 rounded mt-3">
              <h3 className="fs-5 fw-medium d-flex align-items-center mb-3">
                <FaVideo className="me-2 text-warning" /> Educational Videos
              </h3>

              <div className="row g-3">
                {videos.map((video, index) => (
                  <div className="col-12 col-sm-6 col-md-4" key={index}>
                    <div
                      className="bg-secondary rounded p-2 text-center"
                      style={{ cursor: "pointer", transition: "transform 0.3s" }}
                      onClick={() => handleOpenModal(video.url)}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <div
                        style={{
                          height: "150px",
                          backgroundImage: "url('https://via.placeholder.com/300x150')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "6px",
                          marginBottom: "10px"
                        }}
                      />
                      <p className="fw-bold small mb-0">{video.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Body className="p-0 bg-dark">
            <div className="ratio ratio-16x9">
              <iframe
                src={videoUrl}
                title="Help Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
