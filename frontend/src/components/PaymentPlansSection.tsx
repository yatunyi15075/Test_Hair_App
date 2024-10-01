import React from 'react';

const PaymentPlansSection: React.FC = () => {
  return (
    <section className="bg-gray-700 text-white py-12 w-full">
      <h3 className="text-3xl font-semibold text-center mb-8">Payment Plans:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
        {/* Free Plan */}
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h4 className="font-bold text-lg">Free Plan</h4>
          <p className="text-gray-400 mb-2">Basic hair analysis</p>
          <p className="text-xl font-bold">$0/month</p>
        </div>

        {/* Monthly Plan */}
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h4 className="font-bold text-lg">Monthly Plan</h4>
          <p className="text-gray-400 mb-2">Advanced analysis & recommendations</p>
          <p className="text-xl font-bold">$10/month</p>
        </div>

        {/* Yearly Plan */}
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h4 className="font-bold text-lg">Yearly Plan</h4>
          <p className="text-gray-400 mb-2">All features included</p>
          <p className="text-xl font-bold">$100/year</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentPlansSection;
