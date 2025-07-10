
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

//                 </div>
//                 <button className="btn btn-danger mt-3">Cancel Subscription</button>
//             </div>
//         </div>
//     );
// };

// export default Settings;












import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);

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
        if (response.data.data.length > 0) {
          const activePlan = response.data.data[0];
          setCurrentPlan(activePlan);
          setPlan({
            Plan_name: activePlan.plan_name || "N/A",
            promocode: activePlan.promocode || "N/A",
            amount: activePlan.amount || "N/A",
          });
        }
      } catch (error) {
        console.log("Error fetching subscription:", error);
      }
    };

    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const response = await axios.get(`${BASE_URL}/getsubscription`);
        if (response.data && response.data.data) {
          setPlans(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching plans:", error);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchSubscription();
    fetchPlans();
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

  const handleCancelPlan = async () => {
    if (!currentPlan) {
      toast.error("No active plan to cancel.");
      return;
    }

    try {
      // Send data as URL parameters instead of the body for DELETE method
      const response = await axios.put(`${BASE_URL}/cancelSubscription/${userId}`, {
        params: {
          user_id: userId,
          plan_name: currentPlan.plan_name,
        },
      });

      if (response.data.success) {
        setCurrentPlan(null);
        toast.success("Subscription cancelled successfully!");
      } else {
        toast.success("Subscription cancelled successfully!");
      }
      navigate("/hero")
    } catch (error) {
      console.log("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription!");
    }
  };



  // Handle Upgrade Subscription
  const handleUpgradePlan = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan to upgrade!");
      return;
    }

    try {
      const selectedPlanData = plans.find((plan) => plan.plan_name === selectedPlan);

      if (!selectedPlanData) {
        toast.error("Selected plan not found.");
        return;
      }

      const response = await axios.put(`${BASE_URL}/upgradesubscription`, {
        user_id: userId,
        new_plan_name: selectedPlan,
        new_amount: selectedPlanData.amount,
        promocode: selectedPlanData.promocode,
      });

      if (response.data.success) {
        setPlan({
          Plan_name: selectedPlan,
          promocode: response.data.promocode,
          amount: response.data.amount,
        });
        // Show the success message from the backend response
        toast.success(response.data.message || "Subscription upgraded successfully!");
      } else {
        toast.success(response.data.message || "Failed to upgrade subscription!");
      }
    } catch (error) {
      console.log("Error upgrading subscription:", error);
      toast.error(error.response?.data?.message || "Failed to upgrade subscription!");
    }
  };


  return (
    <div className="container my-5">
      <ToastContainer />
      <Link
        to="/backdashboard"
        className="text-white mb-3 d-block text-decoration-none"
        style={{ color: "white", textDecoration: "none", marginBottom: 15 }}
      >
        <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
      </Link>

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

      <div className="row g-2">


        {currentPlan ? (
          <>
            <div className="position-relative plan-card col-sm-4 mt-3">
              <span
                className="badge bg-warning text-dark position-absolute"
                style={{
                  top: "10px",
                  right: "10px",
                  fontSize: "0.9rem",
                  padding: "8px 12px",
                  borderRadius: "10px",
                }}
              >
                Current Plan
              </span>

              <h2 style={{ color: "#fcd34d", fontSize: "20px" }}>
                {currentPlan.plan_name}
              </h2>
              <span style={{ color: "white", fontSize: "20px" }}>
                Original Price:{" "}
              </span>
              <div className="price">{currentPlan.original_price} TL</div>
              <button
                className="btn btn-danger mt-3 mb-4"
                style={{ backgroundColor: "#ff4d4d", color: "white" }}
                onClick={handleCancelPlan}
              >
                Cancel Plan
              </button>
              <br />
              <span
                className=""
                style={{ color: "goldenrod" }}
              >
                <strong>
                  This will also cancel your promo code and future commission
                  payments.
                </strong>
              </span>
            </div>
            <div className="col-sm-8  plan-card ">
              <span style={{ color: "white" }}><strong style={{ color: "goldenrod" }}>“Welcome to Smart Life Academy! </strong>
                Congratulations on joining us! You’re now part of a community dedicated to personal growth with curated book summaries and personalized learning. If you have 1-month plan, you can access the exclusive 30 Days 30 Books Challenge—complete 30 books with 80%+ test scores across 10+ days to earn 11 months free!

                Upgrade your plan anytime to longer terms (e.g.if you have 1 month you can upgrade to , 6-month or 1-year or If you have 6 month plan you can only upgrade to 1 year plan) to lock in savings, but note you can only upgrade, not downgrade, until your current term ends. No refunds are offered due to our referral commissions and challenge rewards, but you can use all services until your paid period ends if you cancel. A new promo code will be issued if you rejoin.

                Explore your dashboard to start learning, track progress, and earn commissions by sharing your unique promo code. <strong style={{ color: "goldenrod" }}> Let’s grow together!
                  Get Started “</strong>
              </span>
            </div>
          </>
        ) : (
          <p style={{ color: "#fcd34d" }}>No active plan</p>
        )}

        <div className="plans-container2 row">
          {loadingPlans ? (
            <p style={{ color: "#fcd34d" }}>Loading plans...</p>
          ) : plans.length > 0 ? (
            plans.map((planItem) => (
              <div
                key={planItem.plan_name}
                className={`plan-card col-sm-4 mt-3 ${selectedPlan === planItem.plan_name ? "selected" : ""
                  }`}
                onClick={() => setSelectedPlan(planItem.plan_name)}
                style={{ cursor: "pointer" }}
              >
                <h2 style={{ color: "#fcd34d", fontSize: "20px" }}>
                  {planItem.plan_name}
                </h2>
                <span style={{ color: "white", fontSize: "20px" }}>
                  Original Price:
                </span>
                <div className="price">{planItem.original_price} TL</div>
              </div>
            ))
          ) : (
            <p style={{ color: "#fcd34d" }}>No plans available</p>
          )}
        </div>
        <button
          className="btn btn-success mt-3"
          style={{ backgroundColor: "#ffc107", color: "black" }}
          onClick={handleUpgradePlan}
        >
          Upgrade Plan
        </button>
      </div>

    </div>
  );
};

export default Settings;                                                                                                                                  
