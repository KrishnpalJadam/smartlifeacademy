import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import logo from "../assets/logo.jpg";
import axios from 'axios';
import BASE_URL from '../Config';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
   
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("userdata");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Logout function
    const handleLogout = async () => {
        const user_data = JSON.parse(localStorage.getItem("userdata"));
        const userId = user_data?.id;
        
        try {
            const response = await axios.post(`${BASE_URL}/logout`, {
                userId: userId,
            });
          
            localStorage.removeItem("userdata"); // Remove user from localStorage
            setUser(null); // Reset user state
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
const login = ()=>{
    navigate('/login')
    window.location.reload();
}
    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-8 py-4 bg-black z-50 container-fluid">
                <div className='flex items-center gap-3'>
                    <Link to="/hero">
                        <img
                            src={logo}
                            alt="Smart Life Academy Logo"
                            className="h-[60px] w-[60px] md:h-[90px] md:w-[90px] object-contain rounded-lg"
                        />
                    </Link>
                    <h1 className="text-[20px] md:text-[30px] font-extrabold text-yellow-300">
                        Smart Life Academy
                    </h1>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white p-2" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* ✅ Desktop Navigation - Show Profile if Logged In */}
                <div className="hidden md:flex gap-4 items-center">
                    {user ? (
                        // If user is logged in
                        <div className="relative d-flex">
                            <Link to="/Dashboard" className="flex items-center gap-2 px-4 py-2 text-white bg-transparent border-none outline-none">
                                <FaUserCircle size={28} className="text-yellow-300" />
                                <span>{user.email}</span>
                            </Link>

                            {/* Logout Button */}
                            <button 
                                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg ml-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // If user is NOT logged in
                        <>
                            <Link onClick={login}>
                                <button className="px-6 md:px-8 py-2 bg-[#1a1a1a] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="px-6 md:px-8 py-2 bg-yellow-300 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* ✅ Mobile Navigation - Show Profile or Login/Signup */}
                <div className={`${isMenuOpen ? "flex" : "hidden"} md:hidden absolute top-full left-0 right-0 flex-col gap-4 bg-black p-4 border-t border-gray-800`}>
                    {user ? (
                        <>
                            <Link className="flex items-center gap-3" to="/Dashoboard">
                                <FaUserCircle size={30} className="text-yellow-300" />
                                <span className="text-white">{user.firstname}</span>
                            </Link>
                            <button
                                className="w-full px-6 py-2 bg-red-600 text-white font-medium rounded-lg"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="w-full">
                                <button className="w-full px-6 py-2 bg-[#1a1a1a] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup" className="w-full">
                                <button className="w-full px-6 py-2 bg-yellow-300 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {/* Spacer to prevent content from hiding under fixed header */}
            <div className="h-[80px] md:h-[108px]"></div>
        </>
    );
};

export default Header;
