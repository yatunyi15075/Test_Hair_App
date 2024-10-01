import React from 'react';

const AnalysisPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <img 
          src="https://example.com/hair-analysis-progress.jpg" 
          alt="Analyzing" 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Analyzing your hair type</h2>
        <p className="text-gray-600 mb-6">It takes about 20 seconds</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-pink-500 h-2.5 rounded-full w-1/3"></div>
        </div>
        <button 
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;
