// import React, { useState } from 'react';
// import { Link, Links, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes, FaBook, FaBookReader, FaChartLine, FaCog, FaQuestionCircle } from 'react-icons/fa';
// import logo from "../assets/logo.jpg"

// function Sidebar() {
//     const location = useLocation();
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const menuItems = [
//         { path: '/Dashboard', icon: <FaBook />, text: 'Library' },
//         { path: '/myreadingList', icon: <FaBookReader />, text: 'My Reading List' },
//         { path: '/progresstracking', icon: <FaChartLine />, text: 'Progress Tracking' },
//         { path: '/settings', icon: <FaCog />, text: 'Settings' },
//         { path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' },

//         // admin panel menus
//         { path: '/adminPanel', icon: <FaHome />, text: 'Admin Panel' },
//     ];
//     return (
//         <>
//             <div style={{ position: "relative" }}>
//                 <button
//                     className="sidebar-toggle"
//                     onClick={toggleSidebar}
//                     style={{ position: "absolute", left: 260 }}
//                 >
//                     {isSidebarOpen ? <FaTimes /> : <FaBars />}
//                 </button>
//             </div>


//             <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//                 <div className="sidebar-header">
//                     <Link to={"/hero"}><img src={logo} alt="Smart Life Academy" className="logo" /></Link>
//                     <h1 className={isSidebarOpen ? 'show' : 'hide'}>Smart Life Academy</h1>
//                 </div>

//                 <div className={`search-container ${isSidebarOpen ? 'show' : 'hide'}`}>
//                     <input
//                         type="text"
//                         placeholder="Search books..."
//                         className="search-input"
//                     />
//                 </div>

//                 <nav className="nav-menu">
//                     {menuItems.map((item, index) => (
//                         <Link
//                             key={index}
//                             to={item.path}
//                             className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
//                         >
//                             <span className="nav-icon">{item.icon}</span>
//                             <span className={`nav-text ${isSidebarOpen ? 'show' : 'hide'}`}>
//                                 {item.text}
//                             </span>
//                         </Link>
//                     ))}
//                 </nav>

//                 <div className={`user-section ${isSidebarOpen ? 'show' : 'hide'}`}>
//                     <p className="user-email">kemalkarasulu1@hotmail.com</p>
//                     <div className='logout-btn'>
//                     <Link to="/signup">Logout</Link></div>
//                 </div>
//             </aside>
//         </>
//     )
// }

// export default Sidebar















import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaBook, FaBookReader, FaChartLine, FaCog, FaQuestionCircle, FaHome } from 'react-icons/fa';
import logo from "../assets/logo.jpg";
import Chatbot from './Chatbot';

function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Role = localStorage.getItem('Role');  // Get user role from localStorage

  const menuItems = [
    // { path: '/dashboard', text: '' },
    { path: '/completeBooks', icon: <FaBookReader />, text: 'Complete Books' },
    { path: '/progresstracking', icon: <FaChartLine />, text: 'Progress Tracking' },
    { path: '/myCommision', icon: <FaBook />, text: 'MyCommision' },
    { path: '/settings', icon: <FaCog />, text: 'Settings' },
    { path: '/helpCenter', icon: <FaQuestionCircle />, text: 'Help Center' },
  ];

  // Add AdminPanel link only for admins
  if (Role === 'admin') {
    menuItems.push({ path: '/adminpanel', icon: <FaHome />, text: 'Admin Panel' });
    menuItems.push({ path: '/bookManagment', icon: <FaBook />, text: 'BookManagement' });
    menuItems.push({ path: '/createPromocode', icon: <FaCog />, text: 'Create Promocode' });

  }

  return (
    <div style={{ position: "relative" }}>
      <button className="sidebar-toggle" onClick={toggleSidebar} style={{ position: "absolute", left: 260 }}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside style={{overflowY: "auto"}} className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to={"/hero"}><img src={logo} alt="Smart Life Academy" className="logo" /></Link>
          <h1 className={isSidebarOpen ? 'show' : 'hide'}>Smart Life Academy</h1>
        </div>

        <div className={`search-container ${isSidebarOpen ? 'show' : 'hide'}`}>
          <input type="text" placeholder="Search books..." className="search-input" />
        </div>

        <nav className="nav-menu">
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
          <div className='logout-btn'>
            <Link to="/login" onClick={() => localStorage.removeItem('Role')}>
              Logout
            </Link>
          </div>
        </div>
      </aside>
      <Chatbot/>
    </div>
  );
}

export default Sidebar;

