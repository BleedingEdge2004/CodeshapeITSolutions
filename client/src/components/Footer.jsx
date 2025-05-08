// Footer.jsx
import React from "react";
import "../styles/Footer.css"; // <-- CSS import

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-columns">
                {/* Column 1 */}
                <div>
                    <h3>MediStore</h3>
                    <p>Your trusted pharmacy partner online.</p>
                </div>

                {/* Column 2 */}
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#h">Home</a></li>
                        <li><a href="#s">Shop</a></li>
                        <li><a href="#c">Cart</a></li>
                        <li><a href="#l">Login</a></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="#a">Ayurveda</a></li>
                        <li><a href="#d">Devices</a></li>
                        <li><a href="#f">Fitness</a></li>
                        <li><a href="#s">Supplements</a></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h4>Newsletter</h4>
                    <input type="email" placeholder="Your Email" />
                    <button>Subscribe</button>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} MediStore. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;