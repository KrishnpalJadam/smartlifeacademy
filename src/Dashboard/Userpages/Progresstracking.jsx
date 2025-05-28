// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import BASE_URL from '../../Config';

// const Progresstracking = () => {
//   const [challengeUsers, setChallengeUsers] = React.useState({});

//   useEffect(() => {
//     const getChallengeData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/getUserChallengeProgress/${localStorage.getItem("id")}`);
//         setChallengeUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching challenge data:", error);
//         setChallengeUsers({});
//       }
//     };
//     getChallengeData();
//   }, []);

//   const booksCompleted = challengeUsers.books_completed || 0;
//   const elapsedDays = challengeUsers.elapsed_days || 0;
//   const avgTestScore = challengeUsers.avg_test_score || 0;
//   const progressPercent = ((booksCompleted / 30) * 100).toFixed(1);

//   return (
//     <div>
//       <div className="container mt-5">
//         <Link
//           to="/Dashboard"
//           className="text-white mb-3 d-block text-decoration-none"
//           style={{
//             color: "white",
//             textDecoration: "none",
//             display: "block",
//             marginBottom: 15
//           }}
//         >
//           <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
//         </Link>
//         <div
//           className="progress-container p-4 border border-secondary mt-5 rounded-3"
//           style={{
//             backgroundColor: "#1a1a1a",
//             padding: 20,
//             borderRadius: 10,
//             border: "1px solid #6c757d",
//             color: "white"
//           }}
//         >
//           <h4>30-Day Challenge Progress</h4>
//           <div className="head-text d-flex justify-content-between mt-4">
//             <p>Books Completed: {booksCompleted}/30</p>
//             <p>Days Elapsed: {elapsedDays}/30</p>
//           </div>

//           {/* Percentage Text */}
//           {/* <p className="text-end text-white mb-1">
//             {progressPercent}% Completed
//           </p> */}

//           {/* Dynamic Progress Bar */}
//           <div
//             className="progress mb-3 bg-dark rounded-pill mt-3"
//             style={{ height: 20, backgroundColor: "#343a40" }}
//           >
//             <div
//               className="progress-bar bg-warning"
//               role="progressbar"
//               style={{
//                 width: `${progressPercent}%`,
//                 transition: "width 0.6s ease"
//               }}
//               aria-valuenow={progressPercent}
//               aria-valuemin="0"
//               aria-valuemax="100"
//             />
//           </div>

//           <div className="row mt-4">
//             <div className="col-md-4 mt-2">
//               <div
//                 className="progress-stat-card"
//                 style={{
//                   backgroundColor: "#241e0d",
//                   padding: 15,
//                   borderRadius: 10,
//                   textAlign: "center"
//                 }}
//               >
//                 <div className="progress-icon" style={{ fontSize: 24 }}>
//                   <i className="fa-solid fa-book-open" />
//                 </div>
//                 <h5 className="mt-2">{booksCompleted}</h5>
//                 <p>Books Read</p>
//               </div>
//             </div>

//             <div className="col-md-4 mt-2">
//               <div
//                 className="progress-stat-card"
//                 style={{
//                   backgroundColor: "#241e0d",
//                   padding: 15,
//                   borderRadius: 10,
//                   textAlign: "center"
//                 }}
//               >
//                 <div className="progress-icon" style={{ fontSize: 24 }}>
//                   <i className="fa-solid fa-trophy" />
//                 </div>
//                 <h5 className="mt-2">{avgTestScore}</h5>
//                 <p>Avg Test Score</p>
//               </div>
//             </div>

//             <div className="col-md-4 mt-2">
//               <div
//                 className="progress-stat-card"
//                 style={{
//                   backgroundColor: "#241e0d",
//                   padding: 15,
//                   borderRadius: 10,
//                   textAlign: "center"
//                 }}
//               >
//                 <div className="progress-icon" style={{ fontSize: 24 }}>
//                   <i className="fa-solid fa-hourglass-start" />
//                 </div>
//                 <h5 className="mt-2" style={{ color: "goldenrod" }}>
//                   InCompleted
//                 </h5>
//                 <p>Challenge Status</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Progresstracking;
















import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../Config';

const Progresstracking = () => {
  const [challengeUsers, setChallengeUsers] = React.useState({});

  useEffect(() => {
    const getChallengeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getUserChallengeProgress/${localStorage.getItem("id")}`);
            console.log(response.data)
        setChallengeUsers(response.data);
      } catch (error) {
        console.error("Error fetching challenge data:", error);
        setChallengeUsers({});
      }
    };
    getChallengeData();
  }, []);

  const booksCompleted = challengeUsers.books_completed || 0;
  const elapsedDays = challengeUsers.elapsed_days || 0;
  const avgTestScore = challengeUsers.avg_test_score || 0;
  const badgeEarn = challengeUsers.badgeEarn || 0;

  
  const challengeStatus = challengeUsers.challenge_status;

  const daysLeft = 30 - elapsedDays;

  const progressPercent = ((booksCompleted / 30) * 100).toFixed(1);

  const dailyBookReadCount = challengeUsers.distinct_days || 0;
  
  const getStatusColor = () => {
    return challengeStatus === "Completed"
      ? "limegreen"
      : challengeStatus === "InProgress"
        ? "goldenrod"
        : "orangered";
  };


  
  return (
    <div>
      <div className="container mt-5">
        <Link
          to="/Dashboard"
          className="text-white mb-3 d-block text-decoration-none"
          style={{
            color: "white",
            textDecoration: "none",
            display: "block",
            marginBottom: 15
          }}
        >
          <i className="fa-solid fa-chevron-left me-3" /> Back to Dashboard
        </Link>

        <div
          className="progress-container p-4 border border-secondary mt-5 rounded-3"
          style={{
            backgroundColor: "#1a1a1a",
            padding: 20,
            borderRadius: 10,
            border: "1px solid #6c757d",
            color: "white"
          }}
        >
          <h4>30-Day Challenge Progress</h4>
          <div className="head-text d-flex justify-content-between mt-4">
            <p>Books Completed: {booksCompleted}/30</p>
            <p>Days Elapsed: {elapsedDays}/30</p>
          </div>

          <div
            className="progress mb-3 bg-dark rounded-pill mt-3"
            style={{ height: 20, backgroundColor: "#343a40" }}
          >
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{
                width: `${progressPercent}%`,
                transition: "width 0.6s ease"
              }}
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          <div className="row mt-4">
            {/* Books Read */}
            <div className="col-md-4 mt-2">
              <div
                className="progress-stat-card"
                style={{
                  backgroundColor: "#241e0d",
                  padding: 15,
                  borderRadius: 10,
                  textAlign: "center"
                }}
              >
                <i className="fa-solid fa-book-open" style={{ fontSize: 24 }} />
                <h5 className="mt-2">{booksCompleted}</h5>
                <p>Books Read</p>
              </div>
            </div>

            {/* Avg Test Score */}
            <div className="col-md-4 mt-2">
              <div
                className="progress-stat-card"
                style={{
                  backgroundColor: "#241e0d",
                  padding: 15,
                  borderRadius: 10,
                  textAlign: "center"
                }}
              >
                <i className="fa-solid fa-trophy" style={{ fontSize: 24 }} />
                <h5 className="mt-2">{avgTestScore}</h5>
                <p>Avg Test Score</p>
              </div>
            </div>

            {/* Challenge Status */}
            <div className="col-md-4 mt-2">
              <div
                className="progress-stat-card"
                style={{
                  backgroundColor: "#241e0d",
                  padding: 15,
                  borderRadius: 10,
                  textAlign: "center"
                }}
              >
                <i className="fa-solid fa-hourglass-start" style={{ fontSize: 24 }} />
                <h5 className="mt-2" style={{ color: getStatusColor() }}>
                  {challengeStatus}
                </h5>
                <p>Challenge Status</p>
              </div>
            </div>

            {/* Badges Earned */}
            <div className="col-md-4 mt-3">
              <div
                className="progress-stat-card"
                style={{
                  backgroundColor: "#241e0d",
                  padding: 15,
                  borderRadius: 10,
                  textAlign: "center"
                }}
              >
                <i className="fa-solid fa-medal" style={{ fontSize: 24 }} />
                <h5 className="mt-2">{badgeEarn}</h5>
                <p>Badges Earned</p>
              </div>
            </div>

           {/* Distinct Days Completed */}
<div className="col-md-4 mt-3">
  <div
    className="progress-stat-card"
    style={{
      backgroundColor: "#241e0d",
      padding: 15,
      borderRadius: 10,
      textAlign: "center"
    }}
  >
    <i className="fa-solid fa-calendar-day" style={{ fontSize: 24 }} />



    <h5 className="mt-2">
  {challengeUsers?.dailyBookReadCount?.map((item, index) => (
    <div key={index}>
      {item?.count}/10 <br />
      Date: {item?.date},
    </div>
  ))}
</h5>

    
    <p>Distinct Completion Days</p>
  </div>
</div>


            {/* Days Left */}
            <div className="col-md-4 mt-3">
              <div
                className="progress-stat-card"
                style={{
                  backgroundColor: "#241e0d",
                  padding: 15,
                  borderRadius: 10,
                  textAlign: "center"
                }}
              >
                <i className="fa-solid fa-clock" style={{ fontSize: 24 }} />
                <h5 className="mt-2">{daysLeft}</h5>
                <p>Days Remaining</p>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="text-center mt-4">
            <p style={{ color: "gold", fontWeight: "bold" }}>
              Keep going! You're just {30 - booksCompleted} books away from 11 months free!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progresstracking;

