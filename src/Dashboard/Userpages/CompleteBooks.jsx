import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../Config";

const CompleteBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Pagination ke liye states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/GetCompletedBooks`);
        // console.log("Fetched Data:", response.data);

        const formattedBooks = response.data.data.map((book) => ({
          id: book.book_id,
          image: book.image || "https://i.ibb.co/chfGcpmZ/6.png",
          name: book.book_name,
          email: book.email,
          status: book.status ? book.status.toLowerCase() : "incompleted",
          is30DaysChallenge: book.correct_answers / book.total_questions >= 0.8,
        }));

        console.log("Formatted Books:", formattedBooks);
        setBooks(formattedBooks);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
  // ✅ Search hone par current page reset
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // ✅ Pagination ke liye slice karna
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

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
                {currentItems.length > 0 ? (
                  currentItems.map((book, index) => (
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
                        {book.status === "completed" && (
                          <span style={{ color: "#ffc107", marginLeft: "5px" }}>
                            (*)
                          </span>
                        )}
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

            {/* ✅ Pagination buttons */}
            {totalPages > 1 && (
              <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm ${
                      currentPage === index + 1
                        ? "btn-primary"
                        : "btn-outline-light"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteBooks;
