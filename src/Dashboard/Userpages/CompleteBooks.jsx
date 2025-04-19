import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../Config";

const CompleteBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/GetCompletedBooks`);

        // Format books data
        const formattedBooks = response.data.data.map((book) => ({
          id: book.book_id,
          image: book.image || "https://via.placeholder.com/50", // Placeholder image
          name: book.book_name || "No Name", // Default to "No Name" if book name is empty
          email: book.email,
          status: book.status ? book.status.toLowerCase() : "incompleted",
          is30DaysChallenge: book.correct_answers / book.total_questions >= 0.8,
        }));

        setBooks(formattedBooks);
        setFilteredBooks(formattedBooks); // Initially, set all books as the filtered books
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Update filtered books based on search query
  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  // Function to export books to CSV
  const exportToCSV = () => {
    const data = filteredBooks.map((book) => ({
      "S.No": book.id,
      "Book Image": book.image,
      "Book Name": book.name,
      "User Name": book.email,
      "Status": book.status.charAt(0).toUpperCase() + book.status.slice(1),
    }));

    const header = ["S.No", "Book Image", "Book Name", "User Name", "Status"];

    let csvContent = header.join(",") + "\n";

    data.forEach((row) => {
      csvContent += `${row["S.No"]},${row["Book Image"]},${row["Book Name"]},${row["User Name"]},${row["Status"]}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Completed_Books_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  return (
    <div>
      <div className="container mt-5">
        <Link
          to="/Dashboard"
          className="d-flex align-items-center mb-4 text-decoration-none text-white"
        >
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
        <h2 className="mb-4 text-white fs-4 fw-bold">All Books</h2>

        <input
          type="text"
          placeholder="Search by Book Name or Email"
          className="form-control mb-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Export to CSV Button */}
        <button className="btn btn-success mb-3" onClick={exportToCSV}>
          Export to CSV
        </button>

        <div
          className="card-custom p-3 mb-3 rounded-3 border border-secondary"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>User Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}.</td>
                      <td>
                        <img
                          src={book.image}
                          className="bookimg"
                          alt="Book"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        {book.name}
                      </td>
                      <td>{book.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            book.status === "completed"
                              ? "bg-success"
                              : "bg-warning"
                          } text-white`}
                          style={{ cursor: "pointer" }}
                        >
                          {book.status.charAt(0).toUpperCase() +
                            book.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Books Available
                    </td>
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

export default CompleteBooks;
