  import React, { useEffect, useState } from "react";
  import { Link, useParams } from "react-router-dom";
  import axios from "axios";
  import BASE_URL from "../../Config";

  const MyCommissions = () => {
    const { id } = useParams();
    const [commissions, setCommissions] = useState(null);
    const [promoCode, setPromoCode] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCommissionData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/getPromocodeReferById/${id}`);
          if (response.data && response.data.data) {
            setCommissions(response.data.data); // no need to wrap in array
            setPromoCode(response.data.data.promocode || "N/A");
          }
        } catch (error) {
          console.error("Error fetching commission data:", error);
          setCommissions(null);
        } finally {
          setLoading(false);
        }
      };

      if (id) fetchCommissionData();
    }, [id]);

    // Safe default
    const referralList = commissions?.referrals || [];

    // Calculate total commission
    const totalCommission = commissions?.monthlySummary?.[0]?.total_commission || 0;

    // CSV Export Function
    const exportToCSV = () => {
      let csv = "User Email, Package, Commission Earned\n";
      referralList.forEach(({ email, plan_name, commission }) => {
        csv += `${email}, ${plan_name}, $${commission || 0}\n`;
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

          <p className="mt-3">
            My Promo Code : <span style={{ color: "#ffc107", fontWeight: "bold" }}>{promoCode}</span>
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : referralList.length > 0 ? (
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-dark">
                <thead>
                  <tr>
                    <th>User Email</th>
                    <th>Package Name</th>
                    <th>Commission Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {referralList.map((ref, index) => (
                    <tr key={`${ref.email}-${index}`}>
                      <td>{ref.email}</td>
                      <td>{ref.plan_name}</td>
                      <td>{ref.commission} TL</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No commission data available.</p>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5 style={{ color: "#ffc107" }}>
              Total Commission of the Month: ${totalCommission}
            </h5>
            <button className="btn btn-warning" onClick={exportToCSV}>
              Download CSV
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default MyCommissions;
