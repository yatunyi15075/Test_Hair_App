// Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection'; // Adjust path if necessary
import CompaniesSection from '../components/CompaniesSection'; // Adjust path if necessary
import PaymentPlansSection from '../components/PaymentPlansSection'; // Adjust path if necessary
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


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
