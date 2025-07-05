import React from 'react'
import { Link } from 'react-router-dom'

const MyreadingList = () => {
    return (
        <div>
            <div className="container mt-5">
                <Link
                    to="/backdashboard"
                    className="d-flex align-items-center mb-4 text-decoration-none text-white"
                >
                    <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
                </Link>
                <div
                    className="card-custom p-3 mb-3 mt-4 rounded-3 border border-secondary text-white"
                    style={{ backgroundColor: "#1a1a1a" }}
                >
                    <Link to="/booksToRead">
                    <h5>Books to Read</h5>
                    <p className="text-secondary">No books in your reading list yet.</p>
                    </Link>
                
                </div>
                <div
                    className="card-custom p-3 rounded-3 border border-secondary text-white"
                    style={{ backgroundColor: "#1a1a1a" }}
                >
                    <Link to="/completeBooks">
                   
                    <h5>Completed Books</h5>
                    <p className="text-secondary">No completed books yet.</p> </Link>
                </div>
            </div>
        </div>
    )
}

export default MyreadingList
