import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext.js';
import { Link } from 'react-router-dom';

const sampleProducts = [
    {
        _id: '1',
        name: 'Paracetamol',
        price: 20,
        description: 'Pain reliever',
    },
    {
        _id: '2',
        name: 'Amoxicillin',
        price: 50,
        description: 'Antibiotic',
    },
];

const HomePage = () => {
    const { addToCart } = useContext(CartContext);

    return (
        <div>
            <h2>Products</h2>
            {sampleProducts.map((product) => (
                <div key={product._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ₹{product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
            <Link to="/cart">Go to Cart</Link>
        </div>
    );
};

export default HomePage;