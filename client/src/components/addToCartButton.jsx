import React from 'react';
import { useCart } from '../context/cartContext.js';
import axios from 'axios';

const AddToCartButton = ({ productId }) => {
    const { dispatch } = useCart();

    const handleAdd = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:5000/api/cart/add',
                { productId },
                { headers: { Authorization:` Bearer ${token}` } }
            );
            dispatch({ type: 'UPDATE_CART', payload: res.data.cart });
        } catch (error) {
            console.error('Add to cart failed', error);
        }
    };

    return <button onClick={handleAdd}>Add to Cart</button>;
};

export default AddToCartButton;