import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../Config";
import { FaEdit, FaTrash } from "react-icons/fa";

const Bookmanagement = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roledata, setRoledata] = useState("");
  const navigate=  useNavigate()
  useEffect(() => {
    const role = localStorage.getItem("Role");
    if (role) {
      setRoledata(role);
    }
    window.scrollTo(0, 0);
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/book`);
      if (response.data && response.data.data) {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/book/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      (book.book_name && book.book_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit=(id)=>{
    navigate(`/addBook/${id}`)
   
  }
  return (
    <div className="container mt-5">
      <nav className="mb-12">
        <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
      </nav>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white fs-4">Books Management</h2>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by book name or author name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto", textWrap: "nowrap" }}>
        <table className="table table-dark table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td className="imgtd">
                    <img
                      src={book.image || "placeholder.jpg"}
                      alt={book.book_name || "Unknown"}
                      style={{ width: "70px", height: "70px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{book.book_name || "Unknown"}</td>
                  <td>{book.author || "Unknown"}</td>
                  <td>
                    <button className="btn btn-danger  me-2" onClick={() => handleDelete(book.id)}>
                      <FaTrash />
                    </button>
                    <button className="btn btn-primary  me-2" onClick={() => handleEdit(book.id)}>
                        <FaEdit />
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookmanagement;