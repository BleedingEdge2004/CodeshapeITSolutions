// src/pages/ProductDetailsPage.jsx

import React from "react";
import "../styles/ProductDetailsPage.css"; // Importing custom styles

const ProductDetailsPage = () => {
    // Dummy product data to display visually (replace with dynamic data later)
    const product = {
        name: "Paracetamol 500mg",
        image: "/images/paracetamol.jpg",
        description: "Effective for pain relief and fever reduction.",
        price: 49.99,
        stock: "In Stock",
        category: "Pain Relief",
    };

    return (
        <div className="product-details">
            {/* Product Image */}
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            {/* Product Information */}
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="category">{product.category}</p>
                <p className="description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <p className={`stock ${product.stock === "In Stock" ? "in-stock" : "out-of-stock"}`}>
                    {product.stock}
                </p>

                {/* Add to Cart Button (no logic yet) */}
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div >
    );
};

export default ProductDetailsPage;