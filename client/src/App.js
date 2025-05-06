import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage.jsx';
import CartPage from './pages/cartPage.jsx';
import { CartProvider } from './context/cartContext.js';

function App()  {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;