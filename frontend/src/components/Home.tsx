// Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection'; // Adjust path if necessary
import CompaniesSection from './CompaniesSection'; // Adjust path if necessary
import PaymentPlansSection from './PaymentPlansSection'; // Adjust path if necessary
import Navbar from './Navbar';
import Footer from './Footer';


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
        <Navbar />
      <HeroSection />
      <CompaniesSection />
      <PaymentPlansSection />
      <Footer />
    </div>
  );
};

export default Home;
