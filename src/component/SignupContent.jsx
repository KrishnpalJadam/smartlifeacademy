import React from 'react';

const SignupContent = () => {
  return (
    <div className="text-white p-4 md:p-5 rounded" style={{ backgroundColor: '#0d0d0d' }}>
      <h2 className="text-yellow-400 fw-bold mb-3">Welcome to Smart Life Academy!</h2>
      <p className="text-light mb-3" style={{ fontSize: '1rem' }}>
        Join a thriving community dedicated to personal growth with curated book summaries and personalized learning! Sign up to unlock your potential with flexible plans:
      </p>

      <ul className="list-unstyled mb-3">
        <li className="mb-2">
          <span className="text-yellow-400 fw-bold">• 1 Month: 449.00 TL</span> – Includes the exclusive <span className="fw-bold">30 Days 30 Books Challenge</span>. Complete 30 books with 80%+ test scores across 10+ days to earn 11 months free!
        </li>
        <li className="mb-2">
          <span className="text-yellow-400 fw-bold">• 6 Months: 1349.00 TL</span> – Save with a mid-term commitment, upgradable to 1-year.
        </li>
        <li className="mb-2">
          <span className="text-yellow-400 fw-bold">• 1 Year: 1825.00 TL</span> – Best value for long-term growth.
        </li>
      </ul>

      <p className="text-light mb-3">
        Upgrade anytime to longer terms (e.g., 1-month to 6-month or 1-year, or 6-month to 1-year) to lock in savings, but <span className="fw-bold">downgrades are not allowed</span> until your current term ends.
      </p>

      <p className="text-light mb-3">
        <span className="fw-bold">No refunds</span> are offered due to our referral commissions and challenge rewards, though you can use all services until your paid period ends if you cancel. A new promo code will be issued if you rejoin.
      </p>

      <div className="bg-yellow-400 text-black p-3 rounded text-center mt-4 fw-semibold">
        Sign up now, share your unique promo code to earn commissions, and start your growth journey!
      </div>
    </div>
  );
};

export default SignupContent;
