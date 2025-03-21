// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import Sallessupoortchatboard from "./Userpages/Sallessupoortchatboard";

// const Library = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const categories = [
//     {
//       category: "Strategic Thinking",
//       books: [
//         { id: 1, title: "Educational Videos 1", image: "https://i.ibb.co/svcNtqb2/1.png" },
//         { id: 2, title: "Educational Videos 2", image: "https://i.ibb.co/svcNtqb2/1.png" },
//       ],
//     },
//     {
//       category: "Financial Freedom",
//       books: [
//         { id: 3, title: "Financial Freedom 1", image: "https://i.ibb.co/VYbJhZSY/98bb78b2-9aba-458a-a564-6aeb3d0c547a.jpg" },
//         { id: 4, title: "Financial Freedom 2", image: "https://i.ibb.co/VYbJhZSY/98bb78b2-9aba-458a-a564-6aeb3d0c547a.jpg" },
//       ],
//     },
//     {
//       category: "Healthy Habits",
//       books: [
//         { id: 5, title: "Healthy Habits 1", image: "https://i.ibb.co/0Lv2snc/3.png" },
//         { id: 6, title: "Healthy Habits 2", image: "https://i.ibb.co/0Lv2snc/3.png" },
//       ],
//     },
//     {
//       category: "Mastering Relationships",
//       books: [
//         { id: 7, title: "Mastering Relationships 1", image: "https://i.ibb.co/V00PdBGp/4.png" },
//         { id: 8, title: "Mastering Relationships 2", image: "https://i.ibb.co/V00PdBGp/4.png" },
//       ],
//     },
//     {
//       category: "Inspirational Biographies",
//       books: [
//         { id: 9, title: "Inspirational Biographies 1", image: "https://i.ibb.co/KjPb57tg/5.png" },
//         { id: 10, title: "Inspirational Biographies 2", image: "https://i.ibb.co/KjPb57tg/5.png" },
//       ],
//     },
//     {
//       category: "Personal Development",
//       books: [
//         { id: 11, title: "Personal Development 1", image: "https://i.ibb.co/chfGcpmZ/6.png" },
//         { id: 12, title: "Personal Development 2", image: "https://i.ibb.co/chfGcpmZ/6.png" },
//       ],
//     },
//   ];

//   return (
//     <div className="library-page" style={{ paddingTop: "70px" }}>
//       {/* Sales Support Button aligned to the right */}
//       {/* <Sallessupoortchatboard/> */}

//       <Link to='/addBook' className="mb-4" style={{ display: "flex", justifyContent: "end" }}>
//         <button className="btn btn-primary ">Add Book</button>
//       </Link>
//       {categories.map((categoryData, index) => (
//         <section key={index} className="books-section p-3 rounded-4" style={{ border: "1px solid #fcd34d" }}>
//           <h2>{categoryData.category}</h2>

//           {/* Horizontal Scroll Container */}
//           <div className="horizontal-scroll-container">
//             {categoryData.books.map((book) => (
//               <Link to="/bookDetails">
//                 <div className="book-card-wrapper" key={book.id}>
//                   <div className="book-card">
//                     <img src={book.image} alt={book.title} />
//                     <div className="book-title-overlay">{book.title}</div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
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
  const [roledata, setRoledata] = useState("")
  console.log(roledata)
  useEffect(() => {
    const role = localStorage.getItem("Role")
    if (role) {
      setRoledata(role)
    }
    window.scrollTo(0, 0);
    fetchCategories();
    fetchAllBooks();
  }, []);

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

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/book`);
      if (response.data && response.data.data) {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="library-page" style={{ paddingTop: "70px" }}>
      {roledata === "admin" && (
        <Link to="/addBook" className="mb-4" style={{ display: "flex", justifyContent: "end" }}>
          <button className="btn btn-primary">Add Book</button>
        </Link>
      )}


      {categories.map((category) => (
        <section key={category.id} className="books-section p-3 rounded-4" style={{ border: "1px solid #fcd34d" }}>
          <h2>{category.category_name}</h2>

          {/* Horizontal Scroll Container */}
          <div className="horizontal-scroll-container">
            {books
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
