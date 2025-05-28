import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../Config';



const VisitedUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/updateVisitedUsersStatus`);
                const formattedUsers = response.data.data.map(user => ({
                    id: user.id,
                    Uemail: user.Uemail,
                    purchaseStatus: user.purchaseStatus === 1 ? "Purchase" : "Not Purchase",
                    userType:user.userType

                }));
                setUsers(formattedUsers);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
 console.log(users)

    return (
        <div className="container mt-5">
            <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
                <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
            </Link>
            <h2 className="mb-4 text-white fs-4 fw-bold">All Visited User</h2>



            <div className="card-custom p-3 mb-3 rounded-3 border border-secondary" style={{ backgroundColor: "#1a1a1a" }}>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>S.No</th>

                                <th>Email</th>
                                <th>Categories</th>
                                <th>User type</th>


                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}.</td>
                                    <td>{user.Uemail} </td>
                                    <td className={user?.purchaseStatus === "Purchase" ? "text-success" : "text-danger"}>
                                        {user?.purchaseStatus}
                                    </td>
                                    <td>{user.userType} </td>

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

export default VisitedUser;
