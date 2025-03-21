// import React from 'react'
// import { Link } from 'react-router-dom'

// const MyCommision = () => {
//   return (
//     <div className='container mt-5' >
//            <Link
//                     to="/Dashboard"
//                     className="d-flex align-items-center mb-4 text-decoration-none text-white"
//                 >
//                     <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
//                 </Link>
//       <div
//   className="border border-secondary mt-4"
//   style={{
//     backgroundColor: "#1a1a1a",
//     padding: 20,
//     borderRadius: 10,
//     color: "white"
//   }}
// >
//   <h4>My Commissions</h4>
  
//   {/* Promo Code Display */}
//   <div className="mb-3" style={{ fontSize: "16px", fontWeight: "bold" }}>
//     My Promo Code: <span style={{ color: "#ffc107" }}>PROMO12345</span>
//   </div>

//   {/* Commissions Table */}
//   <div className="table-responsive">
//     <table className="table table-bordered table-dark">
//       <thead>
//         <tr>
//           <th>Email Address</th>
//           <th>Purchased Package</th>
//           <th>Commission Earned</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* Sample Rows - Replace with dynamic data */}
//         <tr>
//           <td>user1@example.com</td>
//           <td>Premium Package</td>
//           <td>$50</td>
//         </tr>
//         <tr>
//           <td>user2@example.com</td>
//           <td>Basic Package</td>
//           <td>$20</td>
//         </tr>
//         <tr>
//           <td>user3@example.com</td>
//           <td>Pro Package</td>
//           <td>$100</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>

//   {/* Monthly Total Commission */}
//   <div
//     style={{
//       backgroundColor: "#241e0d",
//       color: "white",
//       padding: 15,
//       borderRadius: 5,
//       marginTop: 15,
//       fontWeight: "bold"
//     }}
//   >
//     Total Commission This Month: <span style={{ color: "#ffc107" }}>$170</span>
//   </div>
// </div>

//     </div>
//   )
// }

// export default MyCommision



import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyCommissions = () => {
  // Sample data (Replace with real API data)
  const commissions = [
    { email: "user1@example.com", package: "Premium Package", earned: 50 },
    { email: "user2@example.com", package: "Basic Package", earned: 20 },
    { email: "user3@example.com", package: "Pro Package", earned: 100 }
  ];

  // Calculate total commission
  const totalCommission = commissions.reduce((acc, curr) => acc + curr.earned, 0);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCommissions = commissions.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CSV Export Function
  const exportToCSV = () => {
    let csv = "Email Address, Purchased Package, Commission Earned\n";
    commissions.forEach(({ email, package: pkg, earned }) => {
      csv += `${email}, ${pkg}, $${earned}\n`;
    });
    
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "My_Commissions.csv";
    link.click();
  };

  return (
    <div className="container mt-5">
      <Link to="/Dashboard" className="btn btn-outline-light mb-3">
        &lt; Back to Dashboard
      </Link>
      
      <div className="border border-secondary p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: 10, color: "white" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>My Commissions</h4>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: "14px" }}
          />
        </div>

        <p>My Promo Code: <span style={{ color: "#ffc107", fontWeight: "bold" }}>PROMO12345</span></p>

        {/* Table Displaying Commissions */}
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Purchased Package</th>
                <th>Commission Earned</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommissions.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.package}</td>
                  <td>${user.earned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Commission & Export Button */}
        <div className="d-flex justify-content-between align-items-center">
          <h5 style={{ color: "#ffc107" }}>Total Commission This Month: ${totalCommission}</h5>
          <button className="btn btn-warning" onClick={exportToCSV}>Download CSV</button>
        </div>
      </div>
    </div>
  );
};

export default MyCommissions;
