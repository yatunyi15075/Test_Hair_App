import React from 'react';

const PhotoPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <img 
          src="https://example.com/hair-analysis-photo.jpg" 
          alt="Take a Photo" 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Take a photo</h2>
        <p className="text-gray-600 mb-6">
          We'll use this to detect your hair type and recommend products.
        </p>
        <button 
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none mb-2"
        >
          Use Camera
        </button>
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
        >
          Choose from Library
        </button>
      </div>
    </div>
  );
};

export default PhotoPage;
