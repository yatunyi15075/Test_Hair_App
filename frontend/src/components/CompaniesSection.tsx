import React from 'react';

const CompaniesSection: React.FC = () => {
  return (
    <section className="bg-gray-800 text-white py-8 w-full">
      <h3 className="text-3xl font-semibold text-center mb-6">Companies that use us:</h3>
      <div className="flex justify-center space-x-8">
        <img src="https://www.flaticon.com/free-icon/whatsapp_2111774?term=whatsapp&page=1&position=4&origin=search&related_id=2111774" alt="Company Logo 1" className="h-20 w-auto" />
        <img src="https://via.placeholder.com/150" alt="Company Logo 2" className="h-20 w-auto" />
        <img src="https://via.placeholder.com/150" alt="Company Logo 3" className="h-20 w-auto" />
      </div>
    </section>
  );
};

export default CompaniesSection;
