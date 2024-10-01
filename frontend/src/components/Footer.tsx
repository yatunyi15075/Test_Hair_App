import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">© {new Date().getFullYear()} Hair Analysis. All Rights Reserved.</p>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          <li>
            <Link to="/" className="hover:text-gray-300">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-300">Terms of Service</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
