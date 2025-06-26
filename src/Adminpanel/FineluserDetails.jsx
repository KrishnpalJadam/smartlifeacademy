







import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../Config";


const FineluserDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getUserChallengeProgress/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <div className="text-center text-white mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;
  if (!userData) return <div className="text-center text-warning mt-5">No User Found</div>;

  const booksCompleted = userData.books_completed || 0;
  const elapsedDays = userData.elapsed_days || 0;
  const avgTestScore = userData.avg_test_score || 0;
  const badgesEarned = userData.badgeEarn || 0;

  const dailyBookReadCount = userData.distinct_days || 0;
  const challengeStatus = userData.challenge_status || "InCompleted";
  const daysLeft = 30 - elapsedDays;
  const progressPercent = ((booksCompleted / 30) * 100).toFixed(1);

  const getStatusColor = () => {
    return challengeStatus === "Completed"
      ? "limegreen"
      : challengeStatus === "InProgress"
        ? "goldenrod"
        : "orangered";
  };

  return (
    <div className="container mt-5">
      <Link
        to="/getAllUsers"
        className="text-white mb-3 d-block text-decoration-none"
      >
        <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
      </Link>

      <div className="progress-container p-4 border border-secondary mt-5 rounded-3" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
        <h4>30-Day Challenge Progress</h4>

        <p className="mt-3"><strong style={{ color: "goldenrod" }}>Email:</strong> {userData.email}</p>
        <p className="mt-1"><strong style={{ color: "goldenrod" }}>Promo Code:</strong> {userData.promocode || "GT45GTKO"}</p>

        <div className="d-flex justify-content-between mt-4">
          <p>Books Completed: {booksCompleted}/30</p>
          <p>Days Elapsed: {elapsedDays}/30</p>
        </div>

        <div className="progress mb-2 bg-dark rounded-pill mt-2" style={{ height: 20 }}>
          <div className="progress-bar bg-warning" style={{ width: `${progressPercent}%` }} />
        </div>
        {/* <p className="text-end mb-4  " style={{color: "white"}}>{progressPercent}% Completed</p> */}

        <div className="row">
          {/* Books Read */}
          <div className="col-md-4 mt-2">
            <div className="progress-stat-card text-center p-3 rounded" style={{ backgroundColor: "#241e0d" }}>
              <i className="fa-solid fa-book-open fs-4" />
              <h5 className="mt-2">{booksCompleted}</h5>
              <p>Books Read</p>
            </div>
          </div>

          {/* Avg Test Score */}
          <div className="col-md-4 mt-2">
            <div className="progress-stat-card text-center p-3 rounded" style={{ backgroundColor: "#241e0d" }}>
              <i className="fa-solid fa-trophy fs-4" />
              <h5 className="mt-2">{avgTestScore}%</h5>
              <p>Avg Test Score</p>
            </div>
          </div>

          {/* Challenge Status */}
          <div className="col-md-4 mt-2">
            <div className="progress-stat-card text-center p-3 rounded" style={{ backgroundColor: "#241e0d" }}>
              <i className="fa-solid fa-hourglass-start fs-4" />
              <h5 className="mt-2" style={{ color: getStatusColor() }}>{challengeStatus}</h5>
              <p>Challenge Status</p>
            </div>
          </div>

          {/* Distinct Days */}
          {/* Distinct Days Completed */}
          <div className="col-md-4 mt-3">
            <div
              className="progress-stat-card"
              style={{
                backgroundColor: "#241e0d",
                padding: 15,
                borderRadius: 10,
                textAlign: "center",
                maxHeight: "250px", // restrict height
                overflowY: userData?.dailyBookReadCount?.length > 4 ? "auto" : "unset"
              }}
            >
              <i className="fa-solid fa-calendar-day" style={{ fontSize: 24 }} />
              <h5 className="mt-2">
                {userData?.dailyBookReadCount?.length || 0} / 10
              </h5>

              <div className="mt-2" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                {userData?.dailyBookReadCount?.slice(0, 10)?.map((item, index) => (
                  <div key={index}>
                    📅 {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })} – {item.count} book{item.count > 1 ? "s" : ""}
                  </div>
                ))}

                {userData?.dailyBookReadCount?.length > 10 && (
                  <div
                    style={{ color: "gold", cursor: "pointer", marginTop: "8px" }}
                    onClick={() => alert("Show More feature coming soon!")}
                  >
                    Show More...
                  </div>
                )}
              </div>

              <p className="mt-2">Distinct Completion Days</p>
            </div>
          </div>


          {/* Badges Earned */}
          <div className="col-md-4 mt-3">
            <div className="progress-stat-card text-center p-3 rounded" style={{ backgroundColor: "#241e0d" }}>
              <i className="fa-solid fa-medal fs-4" />
              <h5 className="mt-2">{badgesEarned}</h5>
              <p>Badges Earned</p>
            </div>
          </div>

          {/* Days Left */}
          <div className="col-md-4 mt-3">
            <div className="progress-stat-card text-center p-3 rounded" style={{ backgroundColor: "#241e0d" }}>
              <i className="fa-solid fa-clock fs-4" />
              <h5 className="mt-2">{daysLeft}</h5>
              <p>Days Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineluserDetails;
