import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-yellow-300 text-xl font-bold mb-4">Smart Life Academy</h3>
            <p className="text-sm mb-4">Transform your life with our curated learning experiences and personalized coaching.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition-colors"><FaFacebook size={24} /></a>
             
              <a href="#" className="hover:text-yellow-300 transition-colors"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-yellow-300 transition-colors"><FaLinkedin size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-300 text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-yellow-300 transition-colors">Legal</Link></li>
              <li><Link to="#" className="hover:text-yellow-300 transition-colors">Privacy Policies</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact </Link></li>
             
            </ul>
          </div>

         

          {/* Newsletter */}
          <div>
            <h3 className="text-yellow-300 text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get updates on new courses and features.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Smart Life Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;