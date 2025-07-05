import React from 'react'
import { Link } from 'react-router-dom'

const BooksToRead = () => {
    return (
        <div>
            <div className="container mt-5">
                <Link
                    to="/backdashboard"
                    className="d-flex align-items-center mb-4 text-decoration-none text-white"
                >
                    <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
                </Link>
                <h4 className="mb-4 text-white fs-4 fw-bold">Read To Book</h4>
                <div
                    className="card-custom p-3 mb-3 rounded-3 border border-secondary"
                    style={{ backgroundColor: "#1a1a1a" }}
                >

                    <div>
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
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img
                                                src="https://i.ibb.co/chfGcpmZ/6.png"
                                                className="bookimg"
                                                alt=""
                                            />
                                        </td>
                                        <td>Personal Developments</td>
                                        <td>Amdern Dinsletdich</td>
                                        <td>
                                            <span
                                                className="badge bg-warning text-dark"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Read Book
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <img
                                                src="https://i.ibb.co/chfGcpmZ/6.png"
                                                className="bookimg"
                                                alt=""
                                            />
                                        </td>
                                        <td>Personal Developments</td>
                                        <td>Amdern Dinsletdich</td>
                                        <td>
                                            <span
                                                className="badge bg-warning text-dark"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Read Book
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <img
                                                src="https://i.ibb.co/chfGcpmZ/6.png"
                                                className="bookimg"
                                                alt=""
                                            />
                                        </td>
                                        <td>Personal Developments</td>
                                        <td>Amdern Dinsletdich</td>
                                        <td>
                                            <span
                                                className="badge bg-warning text-dark"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Read Book
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <img
                                                src="https://i.ibb.co/chfGcpmZ/6.png"
                                                className="bookimg"
                                                alt=""
                                            />
                                        </td>
                                        <td>Personal Developments</td>
                                        <td>Amdern Dinsletdich</td>
                                        <td>
                                            <span
                                                className="badge bg-warning text-dark"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Read Book
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksToRead
