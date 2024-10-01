import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold">Hair Analysis</Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-gray-300">Services</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </li>
        </ul>
        <div>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 mx-2"
            onClick={() => navigate('/welcome')}
          >
            Get Started
          </button>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
