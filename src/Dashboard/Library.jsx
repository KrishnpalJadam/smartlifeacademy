



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../Config";

// const Library = () => {
//   const [categories, setCategories] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [roledata, setRoledata] = useState("")
//   // console.log(roledata)
//   useEffect(() => {
//     const role = localStorage.getItem("Role")
//     if (role) {
//       setRoledata(role)
//     }
//     window.scrollTo(0, 0);
//     fetchCategories();
//     fetchAllBooks();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getcategory`);
//       if (response.data && response.data.data) {
//         setCategories(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchAllBooks = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/book`);
//       if (response.data && response.data.data) {
//         setBooks(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   return (
//     <div className="library-page" style={{ paddingTop: "70px" }}>
//       {roledata === "admin" && (
//         <Link to="/addBook" className="mb-4" style={{ display: "flex", justifyContent: "end" }}>
//           <button className="btn btn-primary">Add Book</button>
//         </Link>
//       )}


//       {categories.map((category) => (
//         <section key={category.id} className="books-section p-3 rounded-4" style={{ border: "1px solid #fcd34d" }}>
//           <h2>{category.category_name}</h2>

//           {/* Horizontal Scroll Container */}
//           <div className="horizontal-scroll-container">
//             {books
//               .filter((book) => book.category_id === category.id)
//               .map((book) => (
//                 <Link to={`/bookDetails/${book.id}`} key={book.id} className="book-card-wrapper">
//                   <div className="book-card">
//                     <img src={book.image} alt={book.book_name} />
//                     <div className="book-title-overlay">{book.book_name}</div>
//                   </div>
//                 </Link>
//               ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default Library;









import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../Config";

const Library = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    // Fetch categories and books when the component is mounted
    fetchCategories();
    fetchAllBooks();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getcategory`);
      if (response.data && response.data.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch all books
  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/book`);
      if (response.data && response.data.data) {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data); // Set all books initially
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle the search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredBooks(books); // If no search term, show all books
    } else {
      const filtered = books.filter(book =>
        book.book_name.toLowerCase().includes(e.target.value.toLowerCase()) // Filter by book name
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className="library-page" style={{ paddingTop: "70px" }}>
      {/* Search bar */}
      <div className="row">

     
      <div className="search-container col-sm-10" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search books..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="col-sm-2 mt-2">
        <Link to="/addbook" className="btn btn-primary">Add Book +</Link>
      </div>
      </div>
      {categories.map((category) => (
        <section
          key={category.id}
          className="books-section p-3 rounded-4"
          style={{ border: "1px solid #fcd34d" }}
        >
          <h2>{category.category_name}</h2>

          {/* Horizontal Scroll Container */}
          <div className="horizontal-scroll-container">
            {filteredBooks
              .filter((book) => book.category_id === category.id)
              .map((book) => (
                <Link to={`/bookDetails/${book.id}`} key={book.id} className="book-card-wrapper">
                  <div className="book-card">
                    <img src={book.image} alt={book.book_name} />
                    <div className="book-title-overlay">{book.book_name}</div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Library;
