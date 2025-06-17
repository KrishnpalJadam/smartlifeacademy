
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes, FaBook, FaBookReader, FaChartLine, FaCog, FaQuestionCircle, FaHome, FaUser } from 'react-icons/fa';
// import logo from "../assets/logo.jpg";
// import Chatbot from './Chatbot';
// import { FaClipboardCheck } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';



// function Sidebar() {
//   const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const navigate = useNavigate();

//   const Role = localStorage.getItem('Role');  // Get user role from localStorage
//   const Signupdata = JSON.parse(localStorage.getItem("signupData")); // parse kar le object me
//    const logout = ()=>{
//     localStorage.clear()
//     navigate("/login")

//    }

//   const menuItems = [

//   ];




//   // Add AdminPanel link only for admins
//   if (Role === 'admin') {
//     menuItems.push({ path: '/completeBooks', icon: <FaBookReader />, text: 'Complete Books' });
//     menuItems.push({ path: '/adminpanel', icon: <FaHome />, text: 'Admin Panel' });
//     menuItems.push({ path: '/bookManagment', icon: <FaBook />, text: 'BookManagement' });
//     // menuItems.push({ path: '/progrestrackingadmin', icon: <FaChartLine />, text: 'Progress Tracking' });
//     menuItems.push({ path: '/Review', icon: <FaClipboardCheck />, text: 'Review' }); 
//         menuItems.push({ path: '/getAllUsers', icon: <FaUser />, text: 'All Users' });
//     menuItems.push({ path: '/settings', icon: <FaCog />, text: 'Settings' });
//     menuItems.push({ path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' });

//     // menuItems.push({ path: '/createPromocode', icon: <FaCog />, text: 'Genrate Promocode' });
//   }

//   // Add AdminPanel link only for admins
//   if (Role === 'user') {
//     const plan_name = localStorage.getItem('plan_name');
//     menuItems.push({ path: '/usercompltebook', icon: <FaBookReader />, text: 'Complete Books' });
//     menuItems.push({ path: '/usermycomition', icon: <FaBookReader />, text: 'MyCommision' });
//     {plan_name==="1 Month" &&menuItems.push({ path: '/progresstracking', icon: <FaChartLine />, text: 'Progress Tracking' }) }
//     menuItems.push({ path: '/userprofile', icon: <FaUser />, text: 'Profile' });
//     menuItems.push({ path: '/settings', icon: <FaCog />, text: 'Settings' });

//     menuItems.push({ path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' });
//   }

//   return (
//     <div style={{ position: "relative" }}>
//       <button className="sidebar-toggle" onClick={toggleSidebar} style={{ position: "absolute", left: 260 }}>
//         {isSidebarOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       <aside style={{ overflowY: "auto" }} className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//         <div className="sidebar-header">
//           <Link to={"/hero"}><img src={logo} alt="Smart Life Academy" className="logo" /></Link>
//           <h1 className={isSidebarOpen ? 'show' : 'hide'}>Smart Life Academy</h1>
//         </div>

//         <div className={`search-container ${isSidebarOpen ? 'show' : 'hide'}`}>
//           <input type="text" placeholder="Search books..." className="search-input" />
//         </div>

//         <nav className="nav-menu" >
//           {menuItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
//               <span className="nav-icon">{item.icon}</span>
//               <span className={`nav-text ${isSidebarOpen ? 'show' : 'hide'}`}>
//                 {item.text}
//               </span>
//             </Link>
//           ))}
//         </nav>

//         <div className={`user-section ${isSidebarOpen ? 'show' : 'hide'}`}>
//           {/* <p className="user-email">kemalkarasulu1@hotmail.com</p> */}
//           <div >

//             <button onClick={()=>{logout()}} className='logout-btn'>Logout</button>
//           </div>
//         </div>
//       </aside>
//       <Chatbot />
//     </div>
//   );
// }

// export default Sidebar;












import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBook, FaBookReader, FaChartLine, FaCog, FaQuestionCircle, FaHome, FaUser } from 'react-icons/fa';
import logo from "../assets/logo.jpg";
import Chatbot from './Chatbot';
import { FaClipboardCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Config';

function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [books, setBooks] = useState([]); // State for books
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books for search

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const Role = localStorage.getItem('Role');  // Get user role from localStorage
  const Signupdata = JSON.parse(localStorage.getItem("signupData")); // parse kar le object me
  
  const logout = () => {
    localStorage.clear()
    localStorage.removeItem("isLoggedIn");

    navigate("/login")
  }

  const menuItems = [];



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

  // Add AdminPanel link only for admins
  if (Role === 'admin') {
    menuItems.push({ path: '/completeBooks', icon: <FaBookReader />, text: 'Complete Books' });
    menuItems.push({ path: '/adminpanel', icon: <FaHome />, text: 'Admin Panel' });
    menuItems.push({ path: '/bookManagment', icon: <FaBook />, text: 'BookManagement' });
    menuItems.push({ path: '/Review', icon: <FaClipboardCheck />, text: 'Review' });
    menuItems.push({ path: '/getAllUsers', icon: <FaUser />, text: 'All Users' });
    menuItems.push({ path: '/visitedUser', icon: <FaUser />, text: 'Visited Users' });
    menuItems.push({ path: '/settings', icon: <FaCog />, text: 'Settings' });
    menuItems.push({ path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' });
  }

  // Add AdminPanel link only for admins
  if (Role === 'user') {
    const plan_name = localStorage.getItem('plan_name');
    menuItems.push({ path: '/usercompltebook', icon: <FaBookReader />, text: 'Complete Books' });
    menuItems.push({ path: '/usermycomition', icon: <FaBookReader />, text: 'MyCommision' });
    { plan_name === "1 Month" && menuItems.push({ path: '/progresstracking', icon: <FaChartLine />, text: 'Progress Tracking' }) }
    menuItems.push({ path: '/userprofile', icon: <FaUser />, text: 'Profile' });
    menuItems.push({ path: '/settings', icon: <FaCog />, text: 'Settings' });
    menuItems.push({ path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' });
  }
  const user_data = JSON.parse(localStorage.getItem("userdata"));
  const userId = user_data?.id;
  console.log(userId);
  return (
    <div style={{ position: "relative" }}>
      <button className="sidebar-toggle" onClick={toggleSidebar} style={{ position: "absolute", left: 260 }}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside style={{ overflowY: "auto" }} className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to={"/hero"}><img src={logo} alt="Smart Life Academy" className="logo" /></Link>
          <h1 className={isSidebarOpen ? 'show' : 'hide'}>Smart Life Academy</h1>
        </div>



        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className={`nav-text ${isSidebarOpen ? 'show' : 'hide'}`}>
                {item.text}
              </span>
            </Link>
          ))}
        </nav>

        <div className={`user-section ${isSidebarOpen ? 'show' : 'hide'}`}>
          <button onClick={() => logout(userId)} className='logout-btn'>Logout</button>
        </div>
      </aside>
 
    </div>
  );
}

export default Sidebar;
