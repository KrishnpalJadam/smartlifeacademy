import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../Config";



const UserDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  console.log("Fetched ID:", id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getUserChallengeProgress/${id}`);
        console.log("User Data:", response.data);
        
        if (response.data) {
          setUserData(response.data);
        } else {
          setUserData(null); // If no data is found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center text-warning mt-5">No User Found</div>;
  }

  return (
    <div>
      <div className="container mt-5">
        <Link
          to="/Dashboard"
          className="text-white mb-3 d-block text-decoration-none"
          style={{ color: "white", textDecoration: "none", display: "block", marginBottom: 15 }}
        >
          <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
        </Link>

        {/* 30-Day Challenge Progress Tracking */}
        <div
          className="progress-container p-4 border border-secondary mt-5 rounded-3"
          style={{
            backgroundColor: "#1a1a1a",
            padding: 20,
            borderRadius: 10,
            border: "1px solid #6c757d",
            color: "white",
          }}
        >
          <h4>30-Day Challenge Progress</h4>

          {/* Display User Email and Promo Code */}
          <p className="mt-3">
            <strong style={{ color: "goldenrod" }}>Email: </strong> {userData.email}
          </p>
          <p className="mt-3">
            <strong style={{ color: "goldenrod" }}>Promo Code: </strong> {userData.promo_code || "N/A"}
          </p>

          <div className="head-text d-flex justify-content-between mt-4">
            <p>Books Completed: {userData.books_completed || 0}/30</p>
            <p>Days Elapsed: {userData.days_elapsed || 0}/30</p>
          </div>
          <div
            className="progress mb-3 bg-dark rounded-pill mt-4"
            style={{ height: 20, backgroundColor: "#343a40", borderRadius: 50 }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(userData.books_completed / 30) * 100}%` }}
            />
          </div>
          <div className="row mt-3">
            <div className="col-md-3 mt-2">
              <div className="progress-stat-card" style={{ backgroundColor: "#241e0d", padding: 15, borderRadius: 10, textAlign: "center" }}>
                <div className="progress-icon" style={{ fontSize: 24 }}>
                  <i className="fa-solid fa-book-open" />
                </div>
                <h5 className="mt-2">{userData.books_completed || 0}</h5>
                <p>Books Read</p>
              </div>
            </div>
            <div className="col-md-3 mt-2">
              <div className="progress-stat-card" style={{ backgroundColor: "#241e0d", padding: 15, borderRadius: 10, textAlign: "center" }}>
                <div className="progress-icon" style={{ fontSize: 24 }}>
                  <i className="fa-solid fa-clock" />
                </div>
                <h5 className="mt-2">{userData.hours_spent || 0}</h5>
                <p>Hours Spent</p>
              </div>
            </div>
            <div className="col-md-3 mt-2">
              <div className="progress-stat-card" style={{ backgroundColor: "#241e0d", padding: 15, borderRadius: 10, textAlign: "center" }}>
                <div className="progress-icon" style={{ fontSize: 24 }}>
                  <i className="fa-solid fa-trophy" />
                </div>
                <h5 className="mt-2">{userData.avg_test_score || 0}%</h5>
                <p>Avg Test Score</p>
              </div>
            </div>
            <div className="col-md-3 mt-2">
              <div className="progress-stat-card" style={{ backgroundColor: "#241e0d", padding: 15, borderRadius: 10, textAlign: "center" }}>
                <div className="progress-icon" style={{ fontSize: 24 }}>
                  <i className="fa-solid fa-hourglass-start" />
                </div>
                <h5 className="mt-2">{userData.challenge_status || "InCompleted"}</h5>
                <p>Challenge Status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
