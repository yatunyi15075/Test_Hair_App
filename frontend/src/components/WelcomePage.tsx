import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <img 
          src="https://example.com/hair-analysis-welcome.jpg" 
          alt="Welcome" 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Let's get started</h2>
        <p className="text-gray-600 mb-6">
          We'll guide you through the process of analyzing your hair, and then recommend products that are best for your hair type.
        </p>
        <button 
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none"
        >
          Start Hair Analysis
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
