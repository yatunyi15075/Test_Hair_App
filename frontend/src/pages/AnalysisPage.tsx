import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
        <img 
          src="https://example.com/hair-analysis-progress.jpg" 
          alt="Analyzing" 
          className="w-full h-56 object-cover rounded-md mb-4 shadow-lg"
        />
        <h2 className="text-3xl font-bold mb-2 text-pink-700">Analyzing your hair type</h2>
        <p className="text-gray-600 mb-6">It takes about 20 seconds</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-pink-500 h-2.5 rounded-full w-1/3 transition-all duration-700"></div>
        </div>
        <button 
          onClick={() => navigate('/photo')}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 focus:outline-none transform hover:scale-110 transition-all duration-300"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;
