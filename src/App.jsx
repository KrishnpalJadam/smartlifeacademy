// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Dashboard from "./Dashboard/Dashboard"
// import MasterClassSignUp from "./component/MasterClassSignUp"
// import SelfImprovementSection from "./component/SelfImprovementSection"
// import Hero from "./pages/Hero"
// import Plan from "./component/Plan"
// import SignUp from "./component/SignUp"
// import HelpCenter from "./Dashboard/Userpages/HelpCenter"
// import Settings from "./Dashboard/Userpages/Settings"
// import Progresstracking from "./Dashboard/Userpages/Progresstracking"
// import "./App.css"
// import MyreadingList from "./Dashboard/Userpages/MyreadingList"
// import BooksToRead from "./Dashboard/Userpages/BooksToRead"
// import CompleteBooks from "./Dashboard/Userpages/completeBooks"
// import Login from "./component/Login"
// import Adminpanel from "./Adminpanel/Adminpanel"
// import Contact from "./component/Contact"
// function App() {

//   return (
//     <>
//       <Router>
//         {/* <Header/> */}
//         <Routes>
//           <Route path="/" element={<MasterClassSignUp />} />
//           <Route path="/selfimprovement" element={<SelfImprovementSection />} />
//           <Route path="/hero" element={<Hero />} />
//           <Route path="/Plan" element={<Plan />} />
//           <Route path="/Dashboard" element={<Dashboard />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/helpCenter" element={<HelpCenter />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/progresstracking" element={<Progresstracking />} />
//           <Route path="/myreadingList" element={<MyreadingList />} />
//           <Route path="/booksToRead" element={<BooksToRead />} />
//           <Route path="/completeBooks" element={<CompleteBooks />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* admin route */}
//           <Route path="/adminpanel" element={<Adminpanel />} />
//         </Routes>
//       </Router>
//     </>
//   )
// }

// export default App







import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import MasterClassSignUp from "./component/MasterClassSignUp";
import SelfImprovementSection from "./component/SelfImprovementSection";
import Hero from "./pages/Hero";
import Plan from "./component/Plan";
import SignUp from "./component/SignUp";
import HelpCenter from "./Dashboard/Userpages/HelpCenter";
import Settings from "./Dashboard/Userpages/Settings";
import Progresstracking from "./Dashboard/Userpages/Progresstracking";
import MyreadingList from "./Dashboard/Userpages/MyreadingList";
import BooksToRead from "./Dashboard/Userpages/BooksToRead";
import CompleteBooks from "./Dashboard/Userpages/CompleteBooks";
import Login from "./component/Login";
import Adminpanel from "./Adminpanel/Adminpanel";
import Contact from "./component/Contact";
import "./App.css"
import MyCommision from "./Dashboard/Userpages/MyCommision";
import BookDetails from "./Dashboard/Userpages/BookDetails";
import UserDetails from "./Dashboard/Userpages/UserDetails";
import AddBook from "./Dashboard/Userpages/AddBook";
import Bookmanagement from "./Adminpanel/Bookmanagement";
import CreatePromocode from "./Adminpanel/CreatePromocode";
import Checkout from "./Dashboard/Userpages/Chackout";
import { AudioProvider } from "./Dashboard/AudioContext";
import GlobalAudioPlayer from "./Dashboard/Userpages/GlobalAudioPlayer";
import GetAllUsers from "./Adminpanel/GetAllUsers";
import Userprofile from "./Userpanel/Userprofile";
import UserProfile from "./Userpanel/Userprofile";
import Usercompltebook from "./Userpanel/Usercompltebook";
import Usermycomition from "./Userpanel/Usermycomition";
import Progrestrackingadmin from "./Adminpanel/Progrestrackingadmin";
import Review from "./Dashboard/Userpages/Review";
import FineluserDetails from "./Adminpanel/FineluserDetails";
import FinelUserCommition from "./Adminpanel/FinelUserCommition";
import VisitedUser from "./Adminpanel/VisitedUser";
import GoogleTranslate from "./GoogleTranslate";
import LogoutOnTabClose from "./LogoutOnTabClose";
import SoftwhereNavbar from "./Dashboard/SoftwhereNavbar";

// import Userprofile from "./Userpanel/Userprofile";
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('Role');
  return role === 'admin' ? children : <Navigate to="/Dashboard" />;
};
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
function App() {
  // const user = JSON.parse(localStorage.getItem("userdata"));
  // const currentUserId = user?.id;
  return (
    <>

      <AudioProvider>
       

        <GoogleTranslate />
       
        {/* <LogoutOnTabClose userId={currentUserId} /> */}

        <Router>
          {isLoggedIn && <SoftwhereNavbar />}
          <Routes>
            <Route path="/" element={<MasterClassSignUp />} />
            <Route path="/selfimprovement" element={<SelfImprovementSection />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/plan" element={<Plan />} />
            {/* library page  */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/helpCenter" element={<HelpCenter />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/progresstracking" element={<Progresstracking />} />
            <Route path="/myreadingList" element={<MyreadingList />} />
            <Route path="/booksToRead" element={<BooksToRead />} />
            <Route path="/completeBooks" element={<CompleteBooks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/myCommision" element={<MyCommision />} />
            <Route path="/myCommision/:id" element={<MyCommision />} />

            <Route path="/bookDetails/:id" element={<BookDetails />} />
            <Route path="/userDetails/:id" element={<UserDetails />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="addBook/:id" element={<AddBook />} />

            <Route path="/bookManagment" element={<Bookmanagement />} />
            <Route path="/createPromocode" element={<CreatePromocode />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/getAllUsers" element={<GetAllUsers />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/usercompltebook" element={<Usercompltebook />} />
            <Route path="/usermycomition" element={<Usermycomition />} />
            <Route path="/progrestrackingadmin" element={<Progrestrackingadmin />} />
            <Route path="/fineluserDetails" element={<FineluserDetails />} />
            <Route path="/finelUserCommition" element={<FinelUserCommition />} />
            <Route path="/finelUserCommition/:id" element={<FinelUserCommition />} />
            <Route path="/fineluserDetails/:id" element={<FineluserDetails />} />
            <Route path="/visitedUser" element={<VisitedUser />} />




            {/* Admin-only Route */}
            <Route path="/adminpanel" element={
              <AdminRoute>
                <Adminpanel />
              </AdminRoute>} />
          </Routes>
          <GlobalAudioPlayer />
        </Router>
      </AudioProvider>
    </>
  );
}

export default App;
