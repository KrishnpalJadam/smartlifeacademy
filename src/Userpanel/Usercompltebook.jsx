import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../Config";


const UserCompleteBook = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const storedUserData = localStorage.getItem("userdata");
  const userId = storedUserData ? JSON.parse(storedUserData).id : null;

  useEffect(() => {
    const fetchBooks = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${BASE_URL}/GetCompletedBooks/${userId}`);
        if (response.data && response.data.data) {
          // Deduplicate books by book_id
          const uniqueBooksMap = new Map();
          response.data.data.forEach((book) => {
            if (!uniqueBooksMap.has(book.book_id)) {
              uniqueBooksMap.set(book.book_id, book);
            }
          });

          const formattedBooks = Array.from(uniqueBooksMap.values()).map((book) => ({
            id: book.book_id,
            image: book.image,
            name: book.book_name,
            email: book.email,
            status: book.status ? book.status.toLowerCase() : "incompleted",
            listening_progress: book.listening_progress || 0,
            correct_percentage: book.correct_percentage || 0,
            createdAt: book.test_date ? new Date(book.test_date) : new Date(),
            test_date: book.test_date,
            completed_status: book.completed_status,
          }));

          setBooks(formattedBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };


    fetchBooks();
  }, [userId]);

  const filteredBooks = books.filter(
    (book) =>
      (book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedMonth === null || book.createdAt.getMonth() + 1 === selectedMonth)
  );

  return (
    <div>
      <div className="container mt-5">
        <Link
          to="/Dashboard"
          className="d-flex align-items-center mb-4 text-decoration-none text-white"
        >
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
        <h2 className="mb-4 text-white fs-4 fw-bold">My Completed Books</h2>

        <div className="row g-3 align-items-end mb-4">
          <div className="col-md-6">
            <label htmlFor="search" className="form-label text-white">Search Book:</label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search by Book Name or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="month-select" className="form-label text-white">Select Month:</label>
            <select
              id="month-select"
              className="form-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              <option value={null}>All Months</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month} value={month + 1}>
                  {new Date(0, month).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="card-custom p-3 mb-3 rounded-3 border border-secondary" style={{ backgroundColor: "#1a1a1a" }}>
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book Name</th>
                  <th>Listening Progress</th>
                  <th>Status</th>
                  <th>Test Result</th>
                  <th>Date Completed</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}.</td>
                      <td>
                        {book.name}
                        {book.status === "completed successfully" && (
                          <span style={{ color: "#ffc107", marginLeft: "5px" }}>(*)</span>
                        )}
                      </td>
                      <td>{parseFloat(book.listening_progress).toFixed(2)}%</td>
                      <td>
                        <span
                          className={`badge ${book.status === "completed" ? "bg-success" : "bg-success"} text-white`}
                        >
                          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                        </span>
                      </td>
                      <td>{parseFloat(book.correct_percentage).toFixed(2)}%</td>
                      <td>
                        {book.test_date && !isNaN(new Date(book.test_date))
                          ? new Date(book.test_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No Books Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCompleteBook;








