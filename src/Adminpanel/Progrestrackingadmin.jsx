import React from 'react'
import { Link } from 'react-router-dom'

const Progrestrackingadmin = () => {
  return (
    <div>
      <div className="container mt-5">
  <Link
    to="/Dashboard"
    className="text-white mb-3 d-block text-decoration-none"
    style={{
      color: "white",
      textDecoration: "none",
      display: "block",
      marginBottom: 15
    }}
  >
    <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
  </Link>
  <div
    className="progress-container p-4 border border-secondary mt-5 rounded-3"
    style={{
      backgroundColor: "#1a1a1a",
      padding: 20,
      borderRadius: 10,
      border: "1px solid #6c757d",
      color: "white"
    }}
  >
    <h4>30-Day Challenge Progress</h4>
    <div className="head-text d-flex justify-content-between mt-4">
      <p>Books Completed: 0/30</p>
      <p>Days Elapsed: 0/30</p>
    </div>
    <div
      className="progress mb-3 bg-dark rounded-pill  mt-4"
      style={{ height: 20, backgroundColor: "#343a40", borderRadius: 50 }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: "0%" }}
      />
    </div>
    <div className="row mt-3">
      <div className="col-md-3 mt-2">
        <div
          className="progress-stat-card"
          style={{
            backgroundColor: "#241e0d",
            padding: 15,
            borderRadius: 10,
            textAlign: "center"
          }}
        >
          <div className="progress-icon" style={{ fontSize: 24 }}>
            <i className="fa-solid fa-book-open" />
          </div>
          <h5 className="mt-2">0</h5>
          <p>Books Read</p>
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <div
          className="progress-stat-card"
          style={{
            backgroundColor: "#241e0d",
            padding: 15,
            borderRadius: 10,
            textAlign: "center"
          }}
        >
          <div className="progress-icon" style={{ fontSize: 24 }}>
            <i className="fa-solid fa-clock" />
          </div>
          <h5 className="mt-2">0</h5>
          <p>Hours Spent</p>
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <div
          className="progress-stat-card"
          style={{
            backgroundColor: "#241e0d",
            padding: 15,
            borderRadius: 10,
            textAlign: "center"
          }}
        >
          <div className="progress-icon" style={{ fontSize: 24 }}>
            <i className="fa-solid fa-trophy" />
          </div>
          <h5 className="mt-2">0%</h5>
          <p>Avg Test Score</p>
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <div
          className="progress-stat-card"
          style={{
            backgroundColor: "#241e0d",
            padding: 15,
            borderRadius: 10,
            textAlign: "center"
          }}
        >
          <div className="progress-icon" style={{ fontSize: 24 }}>
          <i className="fa-solid fa-hourglass-start"></i>
          </div>
          <h5 className="mt-2">InCompleted </h5>
          <p>Challenge Status</p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Progrestrackingadmin
