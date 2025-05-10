// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cartContext.js'; // <-- Import cart context
import "../styles/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // State for category dropdown and search input
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    // Access the current cart from context (to get live count)
    const { cart } = useCart();

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // On search submit, redirect to /search?keyword=&category=
    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (search) params.append("keyword", search);
        if (category && category !== "All Categories") params.append("category", category);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <header className='header'>
            {/* Top Info Bar */}
            <div className='info-strip'>
                <div className='info-left'>
                    <span> AboutUs |</span>
                    <span> Blog |</span>
                    <span> ContactUs |</span>
                    <span> FAQs</span>
                </div>
                <div className='infoBox'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="18px">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z" />
                    </svg>
                    <span>You can contact Us 24/7 <span id='blue'>(+91)784736437</span> | </span>
                    <span>Free Shipping on orders Over $100!</span>
                </div>
            </div>

            {/* Logo */}
            <Link to="/" className='logo'>
                <img src='../images/logo.jpg' height="55px" alt="MediStore" />
            </Link>

            {/* Search Bar */}
            <form className='search-bar' onSubmit={handleSearch}>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>All Categories</option>
                    <option>Ayurveda</option>
                    <option>Skin Care</option>
                    <option>Vitamins</option>
                    <option>Diabetes</option>
                    <option>Pain Relief</option>
                </select>
                <input
                    type="text"
                    placeholder="Search Products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                    <FaSearch />
                </button>
            </form>

            {/* Right Icons: Favorites, Account/Login, Cart */}
            <div className='header-icons'>
                <Link to="/favorites">
                    <FaHeart />
                </Link>

                {!token ? (
                    <>
                        <Link to="/login"><FaUser />Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/account"><FaUser />My Account</Link>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                )}

                {/* Cart Icon with Live Count */}
                <Link to="/cart" className="cart-link">
                    <FaShoppingCart />
                    <span className='cart-count'>
                        {cart?.length || 0}
                    </span>
                </Link>
            </div>
        </header>
    );
};

export default Header;