import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Column 1: Logo + Intro */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">MediKart</h2>
                    <p className="text-sm">Your trusted online medical store. Quality products at your doorstep.</p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="text-sm space-y-1">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/products" className="hover:underline">Shop</a></li>
                        <li><a href="/cart" className="hover:underline">Cart</a></li>
                        <li><a href="/account" className="hover:underline">My Account</a></li>
                    </ul>
                </div>

                {/* Column 3: Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Support</h3>
                    <ul className="text-sm space-y-1">
                        <li><a href="/faq" className="hover:underline">FAQs</a></li>
                        <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm mb-2">Stay updated with our latest offers.</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-2 w-full text-black rounded mb-2"
                    />
                    <button className="bg-blue-600 px-4 py-2 text-sm rounded hover:bg-blue-700">Subscribe</button>
                </div>
            </div>

            <div className="text-center mt-8 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} MediKart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;