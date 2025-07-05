import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../Config';
import { Modal, Button, Form } from "react-bootstrap";


const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const [searchQuery, setSearchQuery] = useState("");
    const handleEditPMC = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users`);
                // console.log("Fetched Data:", response.data);


                const formattedUsers = response.data.data.map(user => ({
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    plan_name: user.plan_name,
                    subscription_status: user.subscription_status,
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


    const handleSave = async () => {
        try {
            // PUT API call
            const res = await axios.put(
                `${BASE_URL}/updateUserSubscription/${selectedUser.id}`,
                {
                    email: selectedUser.email,
                    plan_name: selectedUser.plan_name,
                    promocode: selectedUser.promocode,
                    is_active: selectedUser.subscription_status === "Active" ? "1" : "0",
                }
            );

            if (res.status === 200 || res.status === 201) {
                toast.success("User updated successfully!");

                setShowModal(false);
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id ? { ...user, ...selectedUser } : user
                    )
                );


            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user. Please try again.");
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.promocode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <Link to="/backdashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Plan Name</th>

                                <th>Promo Code</th>
                                <th>Subscription Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}.</td>
                                    <td>{user?.firstname}</td>
                                    <td
                                        style={{
                                            color: user.plan_name === "1 Month" ? "#fcd34d" : "#ffffff",
                                            cursor: user.plan_name === "1 Month" ? "pointer" : "default"
                                        }}
                                        onClick={() => {
                                            if (user.plan_name === "1 Month") {
                                                navigate(`/fineluserDetails/${user.id}`);
                                            }
                                        }}
                                    >
                                        {user.email}
                                    </td>

                                    <td>{user?.plan_name}</td>
                                    <td style={{ color: "#fcd34d", cursor: "pointer" }} onClick={() => navigate(`/finelUserCommition/${user.id}`)}>{user.promocode}z</td>
                                    <td>{user.subscription_status}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-success btn-sm ms-2"
                                            onClick={() => handleEditPMC(user)}
                                        >
                                            View
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
            {/* Modal for Edit PMC */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>View - User Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5 className="mb-3">Purchase Details</h5>

                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={selectedUser?.email || ""}
                            onChange={(e) => setSelectedUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Plan Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={selectedUser?.plan_name || ""}
                            onChange={(e) => setSelectedUser(prev => ({ ...prev, plan_name: e.target.value }))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Promo Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={selectedUser?.promocode || ""}
                            onChange={(e) => setSelectedUser(prev => ({ ...prev, promocode: e.target.value }))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subscription Status</Form.Label>
                        <Form.Select
                            value={selectedUser?.subscription_status === "Active" ? "1" : "0"}
                            onChange={(e) => setSelectedUser(prev => ({
                                ...prev,
                                subscription_status: e.target.value === "1" ? "Active" : "Inactive",
                            }))}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </Form.Select>
                    </Form.Group>

                    <hr />
                    <h5>Banking Info (Coming Soon)</h5>
                    <p className="text-muted">This section is a placeholder.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default GetAllUsers;
