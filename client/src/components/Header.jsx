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
                    <svg  xmlns="http://www.w3.org/2000/svg"  height="18" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16" color="rgb(102, 25, 245)"> <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" fill="#6619f5"></path> </svg>
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