// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import BASE_URL from "../../Config";

// const CompleteBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch the books data on component mount
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/GetCompletedBooks`);
        
//         const formattedBooks = response.data.data.map((book) => ({
//           id: book.book_id,
//           image: book.image || "https://i.ibb.co/chfGcpmZ/6.png",
//           name: book.book_name,
//           email: book.email,
//           status: book.status ? book.status.toLowerCase() : "incompleted",
//           is30DaysChallenge: book.correct_answers / book.total_questions >= 0.8,
//         }));

//         setBooks(formattedBooks);
//       } catch (error) {
//         console.log("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const filteredBooks = books.filter(
//     (book) =>
//       book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const plan_name = localStorage.getItem('plan_name');

//   // CSV Download Functionality
//   const downloadCSV = () => {
//     const headers = ["S.No", "Book Image", "Book Name", "User Name", "Status"];
//     const rows = filteredBooks.map((book, index) => [
//       index + 1,
//       book.image,
//       book.name,
//       book.email,
//       book.status.charAt(0).toUpperCase() + book.status.slice(1)
//     ]);

//     const csvContent = [
//       headers.join(","),
//       ...rows.map(row => row.join(","))
//     ].join("\n");

//     // Create a Blob from the CSV content
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "completed_books.csv";
//     link.click();
//   };

//   return (
//     <div>
//       <div className="container mt-5">
//         <Link
//           to="/Dashboard"
//           className="d-flex align-items-center mb-4 text-decoration-none text-white"
//         >
//           <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
//         </Link>
//         <h2 className="mb-4 text-white fs-4 fw-bold">All Books</h2>

//         <input
//           type="text"
//           placeholder="Search by Book Name or Email"
//           className="form-control mb-3"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <div
//           className="card-custom p-3 mb-3 rounded-3 border border-secondary"
//           style={{ backgroundColor: "#1a1a1a" }}
//         >
//           <div className="table-responsive mt-4">
//             <table className="table table-bordered table-dark">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Book Image</th>
//                   <th>Book Name</th>
//                   <th>User Name</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredBooks.length > 0 ? (
//                   filteredBooks.map((book, index) => (
//                     <tr key={book.id}>
//                       <td>{index + 1}.</td>
//                       <td>
//                         <img
//                           src={book.image}
//                           className="bookimg"
//                           alt="Book"
//                           style={{
//                             width: "50px",
//                             height: "50px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </td>
//                       <td>
//                         {book.name}
//                         {book.status === "completed" &&
//                           plan_name === "1 Month" && (
//                             <span
//                               style={{ color: "#ffc107", marginLeft: "5px" }}
//                             >
//                               (*)
//                             </span>
//                           )}
//                       </td>
//                       <td>{book.email}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             book.status === "completed"
//                               ? "bg-success"
//                               : "bg-warning"
//                           } text-white`}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {book.status.charAt(0).toUpperCase() +
//                             book.status.slice(1)}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center">
//                   Loading....
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Button to download CSV */}
//           <div className="mt-3 d-flex justify-content-end">
//             <button
//               className="btn btn-primary"
//               onClick={downloadCSV}
//             >
//               Download CSV
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompleteBooks;













import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../Config";

const CompleteBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month

  // Fetch the books data on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/GetCompletedBooks`);
        
        console.log("API Response:", response); // Log the full response to check structure
        
        if (response.data && response.data.data) {
          const formattedBooks = response.data.data.map((book) => ({
            id: book.book_id, // Use book_id as id
            image: book.image || "https://i.ibb.co/chfGcpmZ/6.png", // Fallback image
            name: book.book_name, // Book name from API
            email: book.email, // Email from API
            status: book.status ? book.status.toLowerCase() : "incompleted", // Status
            correctAnswers: book.correct_answers, // Correct answers
            totalQuestions: book.total_questions, // Total questions
            // Ensure that created_at exists, otherwise use a fallback date
            createdAt: book.created_at ? new Date(book.created_at) : new Date(),  // Default to current date if missing
            is30DaysChallenge: book.correct_answers / book.total_questions >= 0.8, // Challenge logic
          }));

          setBooks(formattedBooks);
        } else {
          console.error("No books data found in the response.");
        }
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search query and selected month
  const filteredBooks = books.filter(
    (book) =>
      (book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedMonth === null || book.createdAt.getMonth() + 1 === selectedMonth)
  );

  const plan_name = localStorage.getItem('plan_name');

  // CSV Download Functionality for the selected month
  const downloadCSV = () => {
    const headers = ["S.No", "Book Image", "Book Name", "User Name", "Status"];
    const rows = filteredBooks.map((book, index) => [
      index + 1,
      book.image,
      book.name,
      book.email,
      book.status.charAt(0).toUpperCase() + book.status.slice(1),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `completed_books_${selectedMonth}.csv`;
    link.click();
  };

  return (
    <div>
      <div className="container mt-5">
        <Link
          to="/Dashboard"
          className="d-flex align-items-center mb-4 text-decoration-none text-white"
        >
          <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
        </Link>
        <h2 className="mb-4 text-white fs-4 fw-bold">All Books</h2>
<div className="d-flex" style={{justifyContent: "space-between"}}>


        {/* Search input */}
        <div>
        <label htmlFor="month-select" className="form-label text-white">Search Book:</label>
        <input
          type="text"
          placeholder="Search by Book Name or Email"
          className="form-control mb-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
     
      {/* Month Filter Dropdown */}
      <div className="mb-3 d-flex">
        <div>
        <label htmlFor="month-select" className="form-label text-white">Select Month:</label>
          <select
            id="month-select"
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            <option value={null}>All Months</option>
            {[...Array(12).keys()].map((month) => (
              <option key={month} value={month + 1}>
                {new Date(0, month).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      <div>
      <button
              className="btn btn-primary mt-8 ms-4"
              onClick={downloadCSV}
            >
              Download CSV for {selectedMonth === null ? 'All Months' : new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })}
            </button> 
      </div>
       
        </div>
        </div>

        <div
          className="card-custom p-3 mb-3 rounded-3 border border-secondary"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>User Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}.</td>
                      <td>
                        <img
                          src={book.image}
                          className="bookimg"
                          alt="Book"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        {book.name}
                        {book.status === "completed" &&
                          // plan_name === "1 Month" &&
                           (
                            <span
                              style={{ color: "#ffc107", marginLeft: "5px" }}
                            >
                              (*)
                            </span>
                          )}
                      </td>
                      <td>{book.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            book.status === "completed"
                              ? "bg-success"
                              : "bg-warning"
                          } text-white`}
                          style={{ cursor: "pointer" }}
                        >
                          {book.status.charAt(0).toUpperCase() +
                            book.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Books Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default CompleteBooks;
