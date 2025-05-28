import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import axios from "axios";
import BASE_URL from "../Config";
import CommsionTrackinglist from "./CommsionTrackinglist";
import { FaChevronDown } from "react-icons/fa";


const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [challengeUsers, setChallengeUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);  // Current page number
  const itemsPerPage = 5;  // Items per page

  useEffect(() => {
    const getChallengeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/gatallUserChallengeProgreses`);
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

  // Filter the challengeUsers based on search term and selected month
  const filteredChallengeUsers = Array.isArray(challengeUsers)
    ? challengeUsers.filter((user) => {
        // Check if email or promocode matches the search term
        const matchesSearchTerm =
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(user.promocode).toLowerCase().includes(searchTerm.toLowerCase());

        // Check if the selected month matches the user's progress month
        // const formattedProgressMonth = String(user.progress_month).padStart(2, '0'); // Ensure month is 2 digits
        const matchesMonth =
          selectedMonth === "" || user.progress_month.toLowerCase() === selectedMonth.toLowerCase(); // Filter by selected month

        return matchesSearchTerm && matchesMonth;
      })
    : [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChallengeUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
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

        {/* Search Bar */}
        <div className="d-flex justify-content-end align-items-center mb-4">
  <input
    type="text"
    className="form-control w-25 mr-3"
    placeholder="Search by Email or Promo Code"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {/* Month Filter Dropdown */}
  <select
    className="form-control w-25"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)} // Update selected month
  >
    <option value="">Select Month</option>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
    <option value="October">October</option>
    <option value="November">November</option>
    <option value="December">December</option>
  </select>
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
                {currentItems.map((user) => (
                  <tr key={user.id} style={{ cursor: "pointer" }}>
                    <td style={{color: "goldenrod"}} onClick={() => navigate(`/userDetails/${user.id}`)}>{user.email}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination-buttons d-flex justify-content-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline-light "
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber + 1)}
              className={`btn mx-1 ${currentPage === pageNumber + 1 ? "btn-warning" : "btn-outline-light"}`}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-outline-light "
          >
            Next
          </button>
        </div>

        {/* User Commission Tracking Table */}
        <CommsionTrackinglist />
      </div>
     
    </div>
  );
};

export default AdminPanel;
