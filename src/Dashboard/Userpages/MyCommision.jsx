import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";

const MyCommissions = () => {
  const { id } = useParams();
  const [commissions, setCommissions] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getPromocodeReferById/${id}`);
        if (response.data && response.data.data) {
          setCommissions(response.data.data);
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


  const totalCommission = commissions?.monthlySummary?.[0]?.total_commission || 0;
  // console.log(currentItems)
  //  const filteredData  = currentItems.filter((item)=>{
  //   item.referrals.month.toLowerCase().includes(selectedMonth.toLowerCase())
  //  })
  //  console.log(filteredData)

  const exportToCSV = () => {
    let csv = "User Email, Package, Commission Earned, Date of Purchase\n";
    referralList.forEach(({ email, plan_name, commission, timestamp }) => {
      const formattedDate = timestamp && !isNaN(new Date(timestamp))
        ? new Date(timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : "N/A";

      csv += `${email}, ${plan_name}, $${commission || 0}, ${formattedDate}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "My_Commissions.csv";
    link.click();
  };
  const referralListRaw = commissions?.referrals || [];
  const referralList = selectedMonth
    ? referralListRaw.filter(
        (item) =>
          item.month &&
          item.month.toLowerCase() === selectedMonth.toLowerCase()
      )
    : referralListRaw;
  
  return (
    <div className="container mt-5">
      <Link to="/adminpanel" className="btn btn-outline-light mb-3">
        &lt; Back to Dashboard
      </Link>

      <div className="border border-secondary p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: 10, color: "white" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-5">My Commissions</h1>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-4">

          {/* Month Filter Dropdown */}
          <select
            className="form-control w-25"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)} // Update selected month
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
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
                  <th>Referred Email</th>
                  <th>Plan Purchased</th>
                  <th>Commission Earned</th>
                  <th>Date of Purchase</th>
                </tr>
              </thead>
              <tbody>
                {referralList.map((ref, index) => {
                  const formattedDate =
                    ref.timestamp && !isNaN(new Date(ref.timestamp))
                      ? new Date(ref.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : "N/A";

                  return (
                    <tr key={`${ref.email}-${index}`}>
                      <td>{ref.email}</td>
                      <td>{ref.plan_name}</td>
                      <td>{ref.commission} TL</td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
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
