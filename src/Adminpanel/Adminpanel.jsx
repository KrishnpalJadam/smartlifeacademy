import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import axios from "axios";
import BASE_URL from "../Config";
import CommsionTrackinglist from "./CommsionTrackinglist";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [challengeUsers, setChallengeUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    const getChallengeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/gatallUserChallengeProgreses`);
        if (response.data && Array.isArray(response.data.data)) {
          const rawData = response.data.data;

          // Remove duplicate users by email
          const uniqueUsers = rawData.filter((user, index, self) =>
            index === self.findIndex((u) => u.email === user.email)
          );

          setChallengeUsers(uniqueUsers);
        } else {
          setChallengeUsers([]);
        }
      } catch (error) {
        console.error("Error fetching challenge data:", error);
        setChallengeUsers([]);
      }
    };
    getChallengeData();
  }, []);


  const filteredChallengeUsers = Array.isArray(challengeUsers)
    ? challengeUsers.filter((user) => {
      const matchesSearchTerm =
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.promocode).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMonth =
        selectedMonth === "" || user.progress_month?.toLowerCase() === selectedMonth.toLowerCase();

      return matchesSearchTerm && matchesMonth;
    })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChallengeUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChallengeUsers.length / itemsPerPage);

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

        <div className="d-flex justify-content-end align-items-center mb-4">
          <input
            type="text"
            className="form-control w-25 mr-3"
            placeholder="Search by Email or Promo Code"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="form-control w-25"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Select Month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

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
                {currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.id} style={{ cursor: "pointer" }}>
                      <td style={{ color: "goldenrod" }} onClick={() => navigate(`/userDetails/${user.id}`)}>
                        {user.email}
                      </td>
                      <td>{user.books_completed}</td>
                      <td>{user.remaining_books}</td>
                      <td>
                        <span className={`badge ${user.subscription_status === "Active" ? "bg-warning text-dark" : "bg-secondary"}`}>
                          {user.subscription_status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${user.bookk_status_for_1_month === "completed" ? "bg-success" : "bg-secondary"}`}>
                          {user.bookk_status_for_1_month === "completed" ? "Complete" : "Incomplete"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 && "active"}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Commission Tracking List */}
        <CommsionTrackinglist />
      </div>
    </div>
  );
};

export default AdminPanel;
