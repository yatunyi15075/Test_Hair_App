import React from 'react';
import { useNavigate } from 'react-router-dom';
import hair from '../assets/hair.jpg';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
        <img 
          src={hair} 
          alt="Welcome" 
          className="w-full h-56 object-cover rounded-md mb-4 shadow-lg"
        />
        <h2 className="text-3xl font-bold mb-2 text-pink-700">Let's get started</h2>
        <p className="text-gray-600 mb-6">
          We'll guide you through the process of analyzing your hair, and then recommend products that are best for your hair type.
        </p>
        <button 
          onClick={() => navigate('/analysis')}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 focus:outline-none transform hover:scale-110 transition-all duration-300"
        >
          Start Hair Analysis
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
