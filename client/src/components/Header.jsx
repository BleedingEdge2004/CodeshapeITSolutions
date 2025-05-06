// client/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-white shadow p-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600">
                MediStore
            </Link>

            {/* Search Box */}
            <div className="flex flex-grow mx-8 max-w-2xl">
                <select className="border border-gray-300 rounded-l px-3 py-2 text-sm">
                    <option>All Categories</option>
                    <option>Medicines</option>
                    <option>Devices</option>
                    <option>Supplements</option>
                </select>
                <input
                    type="text"
                    placeholder="Search Products"
                    className="border-t border-b border-gray-300 px-4 py-2 w-full text-sm"
                />
                <button className="bg-blue-600 text-white px-4 rounded-r flex items-center justify-center">
                    <FaSearch />
                </button>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
                {/* Favorites */}
                <Link to="/favorites" className="text-gray-600 hover:text-blue-600 text-xl">
                    <FaHeart />
                </Link>

                {/* Account/Login */}
                <Link to="/login" className="flex items-center text-sm gap-1 text-gray-700 hover:text-blue-600">
                    <FaUser className="text-xl" />
                    <span>My Account</span>
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                    <FaShoppingCart className="text-2xl" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                        0
                    </span>
                </Link>
            </div>
        </header>
    );
};

export default Header;