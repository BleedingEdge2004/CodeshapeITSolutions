// client/src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
    return (
        <section className="hero bg-blue-100 px-6 py-10 rounded-lg my-4 shadow">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-3">
                    Get Your Medicines Delivered to Your Doorstep
                </h1>
                <p className="text-gray-600">
                    Upto 30% OFF on your first order. Free delivery & easy refills!
                </p>
            </div>
        </section>
    );
};

export default HeroSection;