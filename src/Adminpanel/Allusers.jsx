import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../Config';

const CompleteBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/GetCompletedBooks`);
                // console.log("Fetched Data:", response.data);

                // Backend se aaye data ko modify karke set karna
                const formattedBooks = response.data.data.map(book => ({
                    id: book.book_id,
                    image: book.image || "https://i.ibb.co/chfGcpmZ/6.png", // Default image agar missing ho
                    name: book.book_name,
                    author: `${book.firstname?.trim() || "Unknown"} ${book.lastname?.trim() || ""}`.trim(),
                    status: book.status ? book.status.toLowerCase() : "incompleted", // Ensure lowercase status
                    is30DaysChallenge: book.correct_answers / book.total_questions >= 0.8 // 80% ya zyada pass hone par
                }));

                console.log("Formatted Books:", formattedBooks);
                setBooks(formattedBooks);
            } catch (error) {
                console.log("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

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
                                    <th>Author Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.length > 0 ? books.map((book, index) => (
                                    <tr key={book.id}>
                                        <td>{index + 1}.</td>
                                        <td>
                                            <img
                                                src={book.image}
                                                className="bookimg"
                                                alt="Book"
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        </td>
                                        <td>
                                            {book.name}
                                            {book.status === "completed" && <span style={{ color: "#ffc107", marginLeft: "5px" }}>(*)</span>}
                                        </td>
                                        <td>{book.author}</td>
                                        <td>
                                            <span
                                                className={`badge ${book.status === "completed" ? "bg-success" : "bg-warning"} text-white`}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No Books Available</td>
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
