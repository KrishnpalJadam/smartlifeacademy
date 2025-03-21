// // 


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '../Dashboard/Sidebar';

// const Adminpanel = () => {
//   const [searchTerm, setSearchTerm] = useState('');


//   // Sample data for users' commission tracking
//   const commissionData = [
//     { username: 'serdarkarasulu', promoCode: 'PROMO123', referrals: 5, package: 'Premium Package', commission: 50, totalCommission: 250 },
//     { username: 'ArtHurKas', promoCode: 'PROMO456', referrals: 3, package: 'Basic Package', commission: 30, totalCommission: 90 },
//     { username: 'kemalkarasulu', promoCode: 'PROMO789', referrals: 7, package: 'Pro Package', commission: 70, totalCommission: 490 }
//   ];

//   // Filter commission data based on search term
//   const filteredCommissions = commissionData.filter(user =>
//     user.promoCode.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Sidebar />
//       <div className="container mt-5">
//         <div className="header d-flex justify-content-between">
//           <h2 style={{ color: "#ffc107" }}>Admin Panel</h2>
//           <Link to="/Dashboard" className="btn btn-outline-light mb-3">Back to Dashboard</Link>
//         </div>
//         <hr />

//         {/* Search Bar for Promo Code */}
       

//         <div
//           className="my-4 border border-secondary"
//           style={{
//             backgroundColor: "#1a1a1a",
//             padding: 20,
//             borderRadius: 10,
//             color: "white"
//           }}
//         >
//           <h4>Overview</h4>
//           <div className="row mt-2">
//             <div className="col-md-4 mt-3">
//               <div
//                 style={{
//                   backgroundColor: "#241e0d",
//                   color: "white",
//                   padding: 20,
//                   borderRadius: 5
//                 }}
//               >
//                 0<br />
//                 <small>Total Users</small>
//               </div>
//             </div>
//             <div className="col-md-4 mt-3">
//               <div
//                 style={{
//                   backgroundColor: "#241e0d",
//                   color: "white",
//                   padding: 20,
//                   borderRadius: 5
//                 }}
//               >
//                 0<br />
//                 <small>Active Subscriptions</small>
//               </div>
//             </div>
//             <div className="col-md-4 mt-3">
//               <div
//                 style={{
//                   backgroundColor: "#241e0d",
//                   color: "white",
//                   padding: 20,
//                   borderRadius: 5
//                 }}
//               >
//                 0<br />
//                 <small>Total Books</small>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar for Promo Code (Small and Right-Aligned) */}
//         <div className="mb-4 d-flex justify-content-end">
//           <input
//             type="text"
//             className="form-control w-25"
//             placeholder="Search by Promo Code"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>


//         {/* Commission Tracking Table */}
//         <div className="border border-secondary" style={{ backgroundColor: "#1a1a1a", padding: 20, borderRadius: 10, color: "white" }}>
//           <h4>Commission Tracking</h4>
//           <div className="table-responsive mt-4">
//             <table className="table table-bordered table-dark">
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Promo Code</th>
//                   <th>Successful Referrals</th>
//                   <th>Purchased Package</th>
//                   <th>Commission Per Referral</th>
//                   <th>Total Commission</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCommissions.map((user, index) => (
//                   <tr key={index}>
//                     <td>{user.username}</td>
//                     <td>{user.promoCode}</td>
//                     <td>{user.referrals}</td>
//                     <td>{user.package}</td>
//                     <td>${user.commission}</td>
//                     <td>${user.totalCommission}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Adminpanel;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Navigation function

  // Sample Data for 30-day challenge users
  const challengeUsers = [
    { id: 1, username: "serdarkarasulu@hotmail.com", booksCompleted: 0, testScore: 0, subscription: "active",challengestaues:"InComplete" },
    { id: 2, username: "ArtHurKas@gmail.com", booksCompleted: 0, testScore: 0, subscription: "pending" ,challengestaues:"InComplete" },
    { id: 3, username: "serdarkarasulu", booksCompleted: 0, testScore: 0, subscription: "active" ,challengestaues:"InComplete" },
    { id: 4, username: "kemalkarasulu@hotmail.com", booksCompleted: 0, testScore: 0, subscription: "active" ,challengestaues:"InComplete" }
  ];

  // Sample Data for User Commissions
  const commissionUsers = [
    { id: 1, username: "serdarkarasulu", promoCode: "PROMO123", referrals: 5, package: "Premium Package", commission: 50, totalCommission: 250 },
    { id: 2, username: "ArtHurKas", promoCode: "PROMO456", referrals: 3, package: "Basic Package", commission: 30, totalCommission: 90 },
    { id: 3, username: "kemalkarasulu", promoCode: "PROMO789", referrals: 7, package: "Pro Package", commission: 70, totalCommission: 490 }
  ];

  // Search Filter for Both Tables
  const filteredChallengeUsers = challengeUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCommissionUsers = commissionUsers.filter(user =>
    user.promoCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <div className="header d-flex justify-content-between">
          <h2 style={{ color: "#ffc107" }}>Admin Panel</h2>
          <Link to="/Dashboard" className="btn btn-outline-light mb-3">
            Back to Dashboard
          </Link>
        </div>
        <hr />

        {/* Search Bar */}
        <div className="mb-4 d-flex justify-content-end">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by Username or Promo Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User Progress Table (30-Day Challenge) */}
        <div className="border border-secondary" style={{ backgroundColor: "#1a1a1a", padding: 20, borderRadius: 10, color: "white" }}>
          <h4>30-Day Challenge Progress</h4>
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Books Completed</th>
                  <th>Average Test Score</th>
                  <th>Subscription</th>
                  <th>Challenge Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredChallengeUsers.map((user) => (
                  <tr key={user.id}  style={{ cursor: "pointer" }}>
                    <td onClick={() => navigate(`/userDetails/id`)}>{user.username}</td>
                    <td>{user.booksCompleted}</td>
                    <td>{user.testScore}%</td>
                    <td>
                      <span className={`badge ${user.subscription === "active" ? "bg-warning text-dark" : "bg-secondary"}`}>
                        {user.subscription}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.challengestaues === "active" ? "bg-warning text-dark" : "bg-secondary"}`}>
                        {user.challengestaues}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Commission Tracking Table */}
        <div className="border border-secondary mt-4" style={{ backgroundColor: "#1a1a1a", padding: 20, borderRadius: 10, color: "white" }}>
          <h4>Commission Tracking</h4>
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Promo Code</th>
                  <th>Successful Referrals</th>
               
                  <th>Total Commission</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommissionUsers.map((user) => (
                  <tr key={user.id}  style={{ cursor: "pointer" }}>
                    <td onClick={() => navigate(`/progresstracking`)}>{user.username}</td>
                    <td>
                      <span style={{ color: "#ffc107", cursor: "pointer" }} onClick={() => navigate(`/myCommision`)}>
                        {user.promoCode}
                      </span>
                    </td>
                    <td>{user.referrals}</td>
                  
                    <td>${user.totalCommission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
