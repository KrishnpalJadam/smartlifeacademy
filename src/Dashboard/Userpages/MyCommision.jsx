import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";


const MyCommissions = () => {
  const { id } = useParams(); // Get the ID from URL
  const [commissions, setCommissions] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getPromocodeRefer/${id}`);
         
        if (response.data && response.data.data) {
          setCommissions([response.data.data]);  
          setPromoCode(response.data.data.promocode || "N/A");  
          setCommissions([]);
        }
      } catch (error) {
        console.error("Error fetching commission data:", error);
        setCommissions([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCommissionData();
  }, [id]);

  // Calculate total commission
  const totalCommission = commissions.reduce((acc, curr) => acc + (curr.comitionErned || 0), 0);

  // CSV Export Function
  const exportToCSV = () => {
    let csv = "Email Address, Purchased Referrals, Commission Earned\n";
    commissions.forEach(({ email, referCount, comitionErned }) => {
      csv += `${email}, ${referCount}, $${comitionErned || 0}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "My_Commissions.csv";
    link.click();
  };

  return (
    <div className="container mt-5">
      <Link to="/adminpanel" className="btn btn-outline-light mb-3">
        &lt; Back to Dashboard
      </Link>

      <div className="border border-secondary p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: 10, color: "white" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-5">My Commissions</h1>
        </div>

        <p className="mt-3">My Promo Code : <span style={{ color: "#ffc107", fontWeight: "bold" }}>{promoCode}</span></p>

        {loading ? (
          <p>Loading...</p>
        ) : commissions.length > 0 ? (
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Email Address</th>
                  <th>Purchased Referrals</th>
                  <th>Commission Earned</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.referCount}</td>
                    <td>{(Number(user.comitionErned) || 0).toFixed(2)} TL</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No commission data available.</p>
        )}

        {/* Total Commission & Export Button */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5 style={{ color: "#ffc107" }}>Total Commission This Month: ${(Number(totalCommission)||0).toFixed(2)}</h5>
          <button className="btn btn-warning" onClick={exportToCSV}>Download CSV</button>
        </div>
      </div>
    </div>
  );
};

export default MyCommissions;
