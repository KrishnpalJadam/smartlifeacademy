import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from '../../Config';

function Review() {
    const [searchTerm, setSearchTerm] = useState("");
    const [challengeUsers, setChallengeUsers] = useState([]);
    const navigate = useNavigate();

    // ✅ Move this function outside useEffect so we can call it anytime
    const getChallengeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getReviews`);
            console.log("challengeData", response.data);

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

    const filteredChallengeUsers = Array.isArray(challengeUsers)
        ? challengeUsers.filter((user) =>
            (user.firstname || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`${BASE_URL}/reviews/status/${id}`, { status: newStatus });
            alert(`Status updated to ${newStatus}`);
            await getChallengeData(); // ✅ Refresh list after update
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

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

                {/* Review Table */}
                <div className="border border-secondary" style={{ backgroundColor: "#1a1a1a", padding: 20, borderRadius: 10, color: "white" }}>
                    <h4>User Book Reviews</h4>
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Book Name</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredChallengeUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.firstname}</td>
                                        <td>{user.book_name}</td>
                                        <td>{user.rating}</td>
                                        <td>{user.comment}</td>
                                        <td>
                                            {/* ✅ Clickable status badges */}
                                            <span
                                                className={`badge me-2 ${user.status === "approved" ? "bg-success" : "bg-warning text-dark"}`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleStatusUpdate(user.id, "approved")}
                                            >
                                                Approve
                                            </span>
                                            <span
                                                className="badge bg-danger"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleStatusUpdate(user.id, "rejected")}
                                            >
                                                Reject
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;
