import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaCamera, FaChartLine } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  // Get the current location
  const location = useLocation();

  // Check if the current route is Home ("/")
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar: Only show if not on the Home page */}
      {!isHomePage && (
        <aside className="bg-pink-600 text-white w-64 space-y-6 py-7 px-2 hidden md:block">
          <div className="text-3xl font-bold border-b pb-4 text-center">Hair Analysis</div>

          {/* Navigation Links */}
          <nav className="mt-10">
            <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-700 hover:text-white">
              <FaHome className="inline-block mr-3" /> Home
            </Link>
            <Link to="/analysis" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-700 hover:text-white">
              <FaChartLine className="inline-block mr-3" /> Hair Analysis
            </Link>
            <Link to="/photos" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-700 hover:text-white">
              <FaCamera className="inline-block mr-3" /> Take Photo
            </Link>
          </nav>
        </aside>
      )}

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden flex justify-between bg-pink-600 text-white px-4 py-3">
        <span className="text-2xl font-bold">Hair Analysis</span>
        <button id="mobileMenuButton" className="focus:outline-none">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 text-gray-800">
        <Outlet /> {/* This is where different pages will be rendered */}
      </div>
    </div>
  );
};

export default Dashboard;
