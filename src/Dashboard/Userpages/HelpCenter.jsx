import { FaTools, FaClipboardList, FaInfoCircle, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HelpCenter() {
  return (
    <div className="container-fluid min-vh-100 text-light py-4" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="container">
        <Link
          to="/Dashboard"
          className="d-flex align-items-center mb-4 text-decoration-none text-white"
        >
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
        <h2 className="fs-4 fw-semibold mt-3">Help Center</h2>

        <div className="mt-4 d-flex flex-column gap-3">

          {/* Technical Problems */}
          <div className="p-3 bg-secondary text-light rounded d-flex align-items-center help1">
            <FaTools className="text-warning fs-3 me-3" />
            <div>
              <h3 className="fs-5 fw-medium">Technical Problems</h3>
              <p className="text-muted small">Get help with technical issues and platform usage</p>
            </div>
          </div>

          {/* Plans and Subscription */}
          <div className="p-3 bg-secondary text-light rounded d-flex align-items-center help1">
            <FaClipboardList className="text-success fs-3 me-3" />
            <div>
              <h3 className="fs-5 fw-medium">Plans and Subscription</h3>
              <p className="text-muted small">Information about our plans, pricing, and billing</p>
            </div>
          </div>

          {/* General Inquiries */}
          <div className="p-3 bg-secondary text-light rounded d-flex align-items-center help1">
            <FaInfoCircle className="text-primary fs-3 me-3" />
            <div>
              <h3 className="fs-5 fw-medium">General Inquiries</h3>
              <p className="text-muted small">General questions about Smart Life Academy</p>
            </div>
          </div>

          {/* Educational Videos Section */}
          <div
            style={{
              backgroundColor: "#2c2c2c",
              padding: "20px",
              borderRadius: "10px",
              color: "white",
              marginTop: "20px"
            }}
          >
            <h3 className="fs-5 fw-medium d-flex" style={{ marginBottom: "15px" }}>
              <FaVideo className="me-2 text-warning" /> Educational Videos
            </h3>

            {/* Video Cards Container */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px"
              }}
            >
              {/* Sample Videos - Replace these with actual video links */}
              {["How to Use System", "How to Change Package", "How to Track Progress", "How to Cancel or Change Subscription"].map((title, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#444",
                    borderRadius: "8px",
                    padding: "10px",
                    width: "calc(33% - 10px)",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    textAlign: "center"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onClick={() => alert(`Play Video: ${title}`)} // Replace this with your video player logic
                >
                  <div
                    style={{
                      height: "150px",
                      backgroundColor: "#000",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      backgroundImage: `url('https://via.placeholder.com/150')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  ></div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{title}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
