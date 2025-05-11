// src/components/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
import "../styles/Header.css";
import { useCart } from "../context/cartContext.js";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Get cart count from context
    const { cartCount } = useCart();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        navigate("/login");               // Redirect to login
    };

    return (
        <header className='header'>
            <div className='info-strip'>
                <div className='info-left'>
                    <span> AboutUs |</span>
                    <span> Blog |</span>
                    <span> ContactUs |</span>
                    <span> FAQs</span>
                </div>
                <div className='infoBox'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="18px"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32..." /></svg>
                    <span>You can contact Us 24/7 <span id='blue'>(+91)784736437</span> | </span>
                    <span>Free Shipping on orders Over ₹100! </span>
                </div>
            </div>

            {/* Logo */}
            <Link to="/" className='logo'>
                <img src='/images/logo.jpg' height="55px" alt="MediStore" />
            </Link>

            {/* Search Box */}
            <div className='search-bar'>
                <select>
                    <option>All Categories</option>
                    <option>Ayurveda</option>
                    <option>Skin Care</option>
                    <option>Vitamins</option>
                    <option>Diabetes</option>
                </select>
                <input type="text" placeholder="Search Products" />
                <button><FaSearch /></button>
            </div>

            {/* Icons */}
            <div className='header-icons'>
                {/* Favorites */}
                <Link to="/favorites">
                    <FaHeart />
                </Link>

                {/* Login/Register or My Account/Logout */}
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

                {/* Cart */}
                <Link to="/cart" className="cart-icon">
                    <FaShoppingCart />
                    <span className='cart-count'>{cartCount}</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;