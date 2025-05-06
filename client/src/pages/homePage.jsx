// client/src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import CategoryCards from '../components/CategoryCards.jsx';

const HomePage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <HeroSection />
            <CategoryCards />
        </div>
    );
};

export default HomePage;