import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BASE_URL from '../Config';
import axios from 'axios';

const CommsionTrackinglist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [promoUsers, setPromoUsers] = useState([]); // Promo code users data
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Number of items per page
  
  // Fetching data from API
  useEffect(() => {
    const getPromoUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getPromocodeRefer`);
        console.log("Promo Code Usage Data:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setPromoUsers(response.data.data);
        } else {
          setPromoUsers([]);
        }
      } catch (error) {
        console.error("Error fetching promo code usage data:", error);
        setPromoUsers([]);
      }
    };

    getPromoUsers();
  }, []);

  // Filter promo users based on search term and selected month
  const filteredPromoUsers = promoUsers.filter((user) => {
    const matchesSearchTerm =
      user.promocode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.plan_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMonth =
      selectedMonth === "" || // If no month is selected, do not filter
      user.referrals.some(referral => referral.month.toLowerCase() === selectedMonth.toLowerCase());

    return matchesSearchTerm && matchesMonth;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPromoUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPromoUsers.length / itemsPerPage);

  return (
    <div>
      <div className="mt-5">
        {/* Search Bar */}
        {/* <div className="mb-4 d-flex justify-content-end">
          <input
            type="text"
            placeholder="Search by Email, Promo Code, or Plan"
            className="form-control w-25"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}

        {/* Commission Tracking Table */}
        <div
          className="border border-secondary mt-4"
          style={{
            backgroundColor: "#1a1a1a",
            padding: 20,
            borderRadius: 10,
            color: "white",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className="fs-5">Commission Tracking</h2>
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

          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Promo Code</th>
                  <th>Successful Referrals</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((user, index) => (
                    <tr key={index} style={{ cursor: "pointer" }}>
                      <td>{user.email}</td>
                      <td>
                        <span
                          style={{ color: "#ffc107", cursor: "pointer" }}
                          onClick={() => navigate(`/myCommision/${user.id}`)}
                        >
                          {user.promocode}
                        </span>
                      </td>
                      <td>{user.referCount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline-light mx-2"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber + 1)}
                className={`btn mx-1 ${
                  currentPage === pageNumber + 1
                    ? "btn-warning"
                    : "btn-outline-light"
                }`}
              >
                {pageNumber + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-outline-light mx-2"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommsionTrackinglist;
