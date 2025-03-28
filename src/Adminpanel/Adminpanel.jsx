

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import axios from "axios";
import BASE_URL from "../Config";
import CommsionTrackinglist from "./CommsionTrackinglist";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [challengeUsers, setChallengeUsers] = useState([]); // Ensure initial state is an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const getChallengeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/gatallUserChallengeProgreses`);


        console.log("challengeData", response.data);

        // Ensure response.data.data is an array before setting state
        if (response.data && Array.isArray(response.data.data)) {
          setChallengeUsers(response.data.data);
        } else {
          setChallengeUsers([]); // Set empty array if response is not as expected
        }
      } catch (error) {
        console.error("Error fetching challenge data:", error);
        setChallengeUsers([]); // Set empty array on error to avoid breaking UI
      }
    };
    getChallengeData();
  }, []);





  // Ensure challengeUsers is always an array before using .filter()
  const filteredChallengeUsers = Array.isArray(challengeUsers)
    ? challengeUsers.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <div className="header d-flex justify-content-between">
          <h2 style={{ color: "#ffc107" }}>Admin Panel</h2>
          <Link to="/Dashboard" className="btn btn-outline-light mb-3">
            Back to Dashboard
          </Link>
        </div>
        <hr />

        {/* Search Bar */}
        <div className="mb-4 d-flex justify-content-end">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User Progress Table (30-Day Challenge) */}
        <div className="border border-secondary" style={{ backgroundColor: "#1a1a1a", padding: 20, borderRadius: 10, color: "white" }}>
          <h4>30-Day Challenge Progress</h4>
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Books Completed</th>
                  <th>Remaining Books</th>
                  <th>Subscription</th>
                  <th>Challenge Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredChallengeUsers.map((user) => (
                  <tr key={user.id} style={{ cursor: "pointer" }}>
                    <td onClick={() => navigate(`/userDetails/${user.id}`)}>{user.email}</td>
                    <td>{user.books_completed}</td>
                    <td>{user.remaining_books}</td>
                    <td>
                      <span className={`badge ${user.subscription_status === "Active" ? "bg-warning text-dark" : "bg-secondary"}`}>
                        {user.subscription_status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.books_completed > 0 ? "bg-success" : "bg-secondary"}`}>
                        {user.books_completed > 0 ? "Complete" : "Incomplete"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* User Commission Tracking Table */}
        <CommsionTrackinglist />
      </div>
    </div>
  );
};

export default AdminPanel;
