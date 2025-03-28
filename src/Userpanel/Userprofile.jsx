import React, { useEffect, useState } from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

const UserProfile = () => {
  const [userdata, setuserdata] = useState(null);
  const [signupData, setSignupData] = useState(null);

  useEffect(() => {
    // Local Storage se signupData aur userdata get karna
    const storedSignupData = localStorage.getItem("signupData");
    const storeduserdata = localStorage.getItem("userdata");

    if (storedSignupData) {
      setSignupData(JSON.parse(storedSignupData));
    }
    if (storeduserdata) {
      setuserdata(JSON.parse(storeduserdata));
    }
  }, []);

  // Name aur Email ko fetch karna (Agar signupData me nahi toh userdata se lo)
  const firstName = signupData?.firstname || userdata?.firstname || "N/A";
  const email = signupData?.email || userdata?.email || "N/A";
  const promoCode = signupData?.subscription?.promocode || "N/A";
  const planName = signupData?.subscription?.plan_name || "N/A";

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=My%20Promo%20Code%3A%20${promoCode}`;
  const gmailShareUrl = `https://mail.google.com/mail/u/0/#inbox`;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg text-light bg-dark" style={{ width: "400px", borderRadius: "10px" }}>
        
        <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
          <FaAngleLeft /> Back to Dashboard
        </Link>

        <h2 className="text-center fs-5" style={{ color: "goldenrod" }}>User Profile</h2>

        {(signupData || userdata) ? (
          <>
            <div className="mt-3">
              <p><strong>Name : </strong> {firstName}</p>
              <p><strong>Email : </strong> {email}</p>
              <p><strong>Promo Code : </strong> {promoCode}</p>
              <p><strong>Plan Name : </strong> {planName}</p>

              {/* Share Icons */}
              <div className="d-flex align-items-center mt-3">
                <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
                  <FaWhatsappSquare className="fs-3 text-success" />
                </a>
                <a href={gmailShareUrl} target="_blank" rel="noopener noreferrer" className="ms-4">
                  <BiLogoGmail className="fs-3 text-danger" />
                </a>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-danger">No user data found</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
