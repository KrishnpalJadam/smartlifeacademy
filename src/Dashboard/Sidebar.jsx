
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBook, FaBookReader, FaChartLine, FaCog, FaQuestionCircle, FaHome, FaUser } from 'react-icons/fa';
import logo from "../assets/logo.jpg";
import Chatbot from './Chatbot';
import { FaClipboardCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const Role = localStorage.getItem('Role');  // Get user role from localStorage
  const Signupdata = JSON.parse(localStorage.getItem("signupData")); // parse kar le object me
   const logout = ()=>{
    localStorage.clear()
    navigate("/login")
    
   }

  const menuItems = [
 
  ];

  // Add AdminPanel link only for admins
  if (Role === 'admin') {
    menuItems.push({ path: '/completeBooks', icon: <FaBookReader />, text: 'Complete Books' });
    menuItems.push({ path: '/adminpanel', icon: <FaHome />, text: 'Admin Panel' });
    menuItems.push({ path: '/bookManagment', icon: <FaBook />, text: 'BookManagement' });
    // menuItems.push({ path: '/progrestrackingadmin', icon: <FaChartLine />, text: 'Progress Tracking' });
    menuItems.push({ path: '/Review', icon: <FaClipboardCheck />, text: 'Review' }); 
        menuItems.push({ path: '/getAllUsers', icon: <FaUser />, text: 'All Users' });
    menuItems.push({ path: '/settings', icon: <FaCog />, text: 'Settings' });
    menuItems.push({ path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' });

    // menuItems.push({ path: '/createPromocode', icon: <FaCog />, text: 'Genrate Promocode' });
  }

  // Add AdminPanel link only for admins
  if (Role === 'user') {
    const plan_name = localStorage.getItem('plan_name');
    menuItems.push({ path: '/usercompltebook', icon: <FaBookReader />, text: 'Complete Books' });
    menuItems.push({ path: '/usermycomition', icon: <FaBookReader />, text: 'MyCommision' });
    {plan_name==="1 Month" &&menuItems.push({ path: '/progresstracking', icon: <FaChartLine />, text: 'Progress Tracking' }) }
    menuItems.push({ path: '/userprofile', icon: <FaUser />, text: 'Profile' });
    menuItems.push({ path: '/settings', icon: <FaCog />, text: 'Settings' });

    menuItems.push({ path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' });
  }

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

        <div className={`search-container ${isSidebarOpen ? 'show' : 'hide'}`}>
          <input type="text" placeholder="Search books..." className="search-input" />
        </div>

        <nav className="nav-menu" >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className={`nav-text ${isSidebarOpen ? 'show' : 'hide'}`}>
                {item.text}
              </span>
            </Link>
          ))}
        </nav>

        <div className={`user-section ${isSidebarOpen ? 'show' : 'hide'}`}>
          {/* <p className="user-email">kemalkarasulu1@hotmail.com</p> */}
          <div >
            
            <button onClick={()=>{logout()}} className='logout-btn'>Logout</button>
          </div>
        </div>
      </aside>
      <Chatbot />
    </div>
  );
}

export default Sidebar;

















// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes, FaBook, FaBookReader, FaChartLine, FaCog, FaQuestionCircle, FaHome, FaUser } from 'react-icons/fa';
// import axios from 'axios'; // ✅ Import axios
// import BASE_URL from '../Config'; // ✅ Import BASE_URL
// import logo from "../assets/logo.jpg";
// import Chatbot from './Chatbot';

// function Sidebar() {
//   const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [user, setUser] = useState(null); // ✅ State for user data
//   const Role = localStorage.getItem('Role'); // ✅ Get role from localStorage

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // ✅ Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/users`);
//         setUser(response.data); // ✅ Ensure this sets correct data
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   // ✅ Define menu items
//   const menuItems = [
//     { path: '/completeBooks', icon: <FaBookReader />, text: 'Complete Books' },
//     { path: '/progresstracking', icon: <FaChartLine />, text: 'Progress Tracking' },
//     { path: '/myCommision', icon: <FaBook />, text: 'My Commission' },
//     { path: '/settings', icon: <FaCog />, text: 'Settings' },
//     { path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' },
//   ];

//   // ✅ Add Admin-only menu items
//   if (Role === 'admin') {
//     menuItems.push({ path: '/adminpanel', icon: <FaHome />, text: 'Admin Panel' });
//     menuItems.push({ path: '/bookManagment', icon: <FaBook />, text: 'Book Management' });
//     menuItems.push({ path: '/getAllUsers', icon: <FaUser />, text: 'All Users' });
//   }

//   // ✅ Add user profile dynamically only if user data exists
//   if (Role === 'user' ) {
//     menuItems.push({
//       path: `/userprofile`,
//       icon: <FaUser />,
//       text: 'Profile'
//     });
//   }

//   return (
//     <div style={{ position: "relative" }}>
//       {/* ✅ Sidebar Toggle Button */}
//       <button className="sidebar-toggle" onClick={toggleSidebar} style={{ position: "absolute", left: 260 }}>
//         {isSidebarOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/* ✅ Sidebar */}
//       <aside style={{ overflowY: "auto" }} className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//         {/* ✅ Sidebar Header */}
//         <div className="sidebar-header">
//           <Link to="/hero"><img src={logo} alt="Smart Life Academy" className="logo" /></Link>
//           <h1 className={isSidebarOpen ? 'show' : 'hide'}>Smart Life Academy</h1>
//         </div>

//         {/* ✅ Search Bar */}
//         <div className={`search-container ${isSidebarOpen ? 'show' : 'hide'}`}>
//           <input type="text" placeholder="Search books..." className="search-input" />
//         </div>

//         {/* ✅ Navigation Menu */}
//         <nav className="nav-menu border-0">
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

//         {/* ✅ Logout Button */}
//         <div className={`user-section ${isSidebarOpen ? 'show' : 'hide'}`}>
//           <div className='logout-btn'>
//             <Link to="/login" onClick={() => {
//               localStorage.removeItem('Role');
//               setUser(null);
//             }}>
//               Logout
//             </Link>
//           </div>
//         </div>
//       </aside>

//       {/* ✅ Chatbot Component */}
//       <Chatbot />
//     </div>
//   );
// }

// export default Sidebar;
