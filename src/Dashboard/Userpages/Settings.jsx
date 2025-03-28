
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../../Config";

// const Settings = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         currentPassword: "",
//         newPassword: "",
//     });

//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${BASE_URL}/changepassword`, formData);
//             setMessage(response.data.message);
//             <ToastContainer />
//         } catch (error) {
//             setMessage(error.response?.data?.message || "An error occurred");
//         }
//     };

//     return (
//         <div className="container my-5">
//             <Link
//                 to="/Dashboard"
//                 className="text-white mb-3 d-block text-decoration-none"
//                 style={{
//                     color: "white",
//                     textDecoration: "none",
//                     display: "block",
//                     marginBottom: 15,
//                 }}
//             >
//                 <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
//             </Link>

//             {/* Account Settings */}
//             <div
//                 className="progress-settings-container mb-4 mt-5 border border-secondary"
//                 style={{
//                     backgroundColor: "#1a1a1a",
//                     padding: 20,
//                     borderRadius: 10,
//                     border: "1px solid #6c757d",
//                     color: "white",
//                 }}
//             >
//                 <h4>
//                     <span className="me-2">
//                         <i className="fa-solid fa-circle-user" />
//                     </span>
//                     Account Settings
//                 </h4>

//                 <form onSubmit={handleSubmit}>
//                     <label className="form-label mt-3">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         className="form-control bg-dark text-white"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />

//                     <label className="form-label mt-3">Current Password</label>
//                     <input
//                         type="password"
//                         name="currentPassword"
//                         className="form-control bg-dark text-white"
//                         value={formData.currentPassword}
//                         onChange={handleChange}
//                         required
//                     />

//                     <label className="form-label mt-3">New Password</label>
//                     <input
//                         type="password"
//                         name="newPassword"
//                         className="form-control bg-dark text-white"
//                         value={formData.newPassword}
//                         onChange={handleChange}
//                         required
//                     />

//                     <button
//                         type="submit"
//                         className="btn mt-3"
//                         style={{ backgroundColor: "#ffc107", color: "black" }}
//                     >
//                         Update Password
//                     </button>
//                 </form>

//                 {message && (
//                     <div className="alert mt-3" style={{ color: "yellow" }}>
//                         {message}
//                     </div>
//                 )}
//             </div>

//              {/* Subscription Management */}
//            <div
//                 className="progress-settings-container border border-secondary"
//                 style={{
//                     backgroundColor: "#1a1a1a",
//                     padding: 20,
//                     borderRadius: 10,
//                     border: "1px solid #6c757d",
//                     color: "white"
//                 }}
//             >
//                 <h4 className='mb-2'>
//                     <span className="me-2">
//                         <i className="fa-solid fa-folder-closed" />
//                     </span>
//                     Subscription Management
//                 </h4>
//                 <p className='mt-3'>
//                     <strong>Current Plan:</strong> Annual
//                 </p>
//                 <p className='mt-2'>
//                     <strong>Status:</strong> Active
//                 </p>
//                 <h6 className="my-3">Bigger Plan</h6>
//                 <div className="row g-2">
//                     <div className="col-12 col-md-4">
//                         <button
//                             className="progress1-plan-btn"
//                             style={{
//                                 backgroundColor: "#2a2a2a",
//                                 color: "white",
//                                 border: "none",
//                                 padding: 10,
//                                 borderRadius: 5,
//                                 width: "100%"
//                             }}
//                         >
//                             Monthly Plan
//                             <br />
//                             449$/month
//                         </button>
//                     </div>
//                     <div className="col-12 col-md-4">
//                         <button
//                             className="progress1-plan-btn"
//                             style={{
//                                 backgroundColor: "#2a2a2a",
//                                 color: "white",
//                                 border: "none",
//                                 padding: 10,
//                                 borderRadius: 5,
//                                 width: "100%"
//                             }}
//                         >
//                             6 Months Plan
//                             <br />
//                             1349$/month
//                         </button>
//                     </div>
//                     <div className="col-12 col-md-4">
//                         <button
//                             className="progress1-plan-btn"
//                             style={{
//                                 backgroundColor: "#2a2a2a",
//                                 color: "white",
//                                 border: "none",
//                                 padding: 10,
//                                 borderRadius: 5,
//                                 width: "100%"
//                             }}
//                             disabled=""
//                         >
//                             Annual Plan
//                             <br />
//                             1825$/month
//                         </button>
//                     </div>
//                 </div>
//                 <button className="btn btn-danger mt-3">Cancel Subscription</button>
//             </div>
//         </div>
//     );
// };

// export default Settings;

















import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");
    const [plan, setPlan] = useState({
        Plan_name: "N/A",
        promocode: "N/A",
        amount: "N/A",
    });

    // 🔥 LocalStorage se user ID fetch karna
    const storedUserData = localStorage.getItem("userdata");
    const userId = storedUserData ? JSON.parse(storedUserData).id : null;

    useEffect(() => {
        if (!userId) {
            console.log("User ID not found!");
            
            return;
        }
    
        const fetchSubscription = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getsubscriptionByid/${userId}`);
                console.log("Subscription Data:", response.data);
    
                if (response.data.data.length > 0) {
                    setPlan({
                        Plan_name: response.data.data[0].plan_name || "N/A",
                        promocode: response.data.data[0].promocode || "N/A",
                        amount: response.data.data[0].amount || "N/A",
                    });
                }
            } catch (error) {
                console.log("Error fetching subscription:", error);
            }
        };
    
        fetchSubscription();
    }, [userId]);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/changepassword`, formData);
            setMessage(response.data.message);
            toast.success("Password updated successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred");
            toast.error("Failed to update password!");
        }
    };

    const handleCancelSubscription = async () => {
        if (!userId) {
            toast.error("User ID not found!");
            return;
        }

        if (window.confirm("Are you sure you want to cancel your subscription?")) {
            try {
                await axios.delete(`${BASE_URL}/SubscriptionDelete/${userId}`);
                localStorage.removeItem("userdata"); // ✅ User data delete karna
                toast.success("Subscription canceled successfully!");
                setTimeout(() => {
                    navigate("/login"); // ✅ Redirect to login page
                }, 2000);
            } catch (error) {
                console.log("Error canceling subscription:", error);
                toast.error("Failed to cancel subscription!");
            }
        }
    };

    return (
        <div className="container my-5">
            <ToastContainer />
            <Link
                to="/Dashboard"
                className="text-white mb-3 d-block text-decoration-none"
                style={{ color: "white", textDecoration: "none", marginBottom: 15 }}
            >
                <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
            </Link>

            {/* 🔹 Account Settings */}
            <div
                className="progress-settings-container mb-4 mt-5 border border-secondary"
                style={{
                    backgroundColor: "#1a1a1a",
                    padding: 20,
                    borderRadius: 10,
                    border: "1px solid #6c757d",
                    color: "white",
                }}
            >
                <h4>
                    <span className="me-2">
                        <i className="fa-solid fa-circle-user" />
                    </span>
                    Account Settings
                </h4>

                <form onSubmit={handleSubmit}>
                    <label className="form-label mt-3">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control bg-dark text-white"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label className="form-label mt-3">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        className="form-control bg-dark text-white"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />

                    <label className="form-label mt-3">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="form-control bg-dark text-white"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="btn mt-3"
                        style={{ backgroundColor: "#ffc107", color: "black" }}
                    >
                        Update Password
                    </button>
                </form>

                {message && (
                    <div className="alert mt-3" style={{ color: "yellow" }}>
                        {message}
                    </div>
                )}
            </div>

            {/* 🔹 Subscription Management */}
            <div
                className="progress-settings-container border border-secondary"
                style={{
                    backgroundColor: "#1a1a1a",
                    padding: 20,
                    borderRadius: 10,
                    border: "1px solid #6c757d",
                    color: "white",
                }}
            >
                <h4 className="mb-2">
                    <span className="me-2">
                        <i className="fa-solid fa-folder-closed" />
                    </span>
                    Subscription Management
                </h4>
                <p className="mt-3">
                    <strong>Current Plan:</strong> {plan.Plan_name}
                </p>
                <p className="mt-3">
                    <strong>Promocode:</strong> {plan.promocode}
                </p>
                <div className="row g-2">
                    <div className="col-12 col-md-4">
                        <button
                            className="progress1-plan-btn"
                            style={{
                                backgroundColor: "#2a2a2a",
                                color: "white",
                                border: "none",
                                padding: 10,
                                borderRadius: 5,
                                width: "100%",
                            }}
                        >
                            {plan.Plan_name}
                            <br />
                            {plan.amount} TL
                        </button>
                    </div>
                </div>
                <button className="btn btn-danger mt-3" onClick={handleCancelSubscription}>
                    Cancel Subscription
                </button>
            </div>
        </div>
    );
};

export default Settings;

