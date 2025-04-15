import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../Config';


const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users`);
                // console.log("Fetched Data:", response.data);

                // Response में "data" key के अंदर users array है, उसे एक्सट्रैक्ट करके सही फॉर्मेट में स्टोर कर रहे हैं।
                const formattedUsers = response.data.data.map(user => ({
                    id: user.id,
                    email: user.email,
                    // password: user.password,
                    promocode: user.promocode || "N/A"
                }));

                setUsers(formattedUsers);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${BASE_URL}/users/${id}`);
                setUsers(users.filter(user => user.id !== id));
                alert("User deleted successfully!");
            } catch (error) {
                console.log("Error deleting user:", error);
                alert("Failed to delete user.");
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.promocode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
                <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
            </Link>
            <h2 className="mb-4 text-white fs-4 fw-bold">All Users</h2>

            <input
                type="text"
                placeholder="Search by Email or Promo Code"
                className="form-control mb-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="card-custom p-3 mb-3 rounded-3 border border-secondary" style={{ backgroundColor: "#1a1a1a" }}>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Email</th>
                                {/* <th>Password</th> */}
                                <th>Promo Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}.</td>
                                    <td>{user.email}</td>
                                    {/* <td>{user.password}</td> */}
                                    <td>{user.promocode}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No Users Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllUsers;
