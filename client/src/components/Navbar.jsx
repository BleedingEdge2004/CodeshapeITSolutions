// src/components/Navbar.jsx
import React from 'react';

// A simple navigation bar to switch between pages
const Navbar = () => {
    return (
        <nav className="navbar bg-white shadow-md px-6 py-3">
            {/* Dummy categories, can be dynamic later */}
            <ul className="flex gap-6 font-medium text-gray-700 text-sm">
                <li className="cursor-pointer hover:text-blue-600">All Medicines</li>
                <li className="cursor-pointer hover:text-blue-600">Wellness</li>
                <li className="cursor-pointer hover:text-blue-600">Personal Care</li>
                <li className="cursor-pointer hover:text-blue-600">Ayurveda</li>
                <li className="cursor-pointer hover:text-blue-600">Fitness</li>
            </ul>
        </nav>
    );
};


export default Navbar;