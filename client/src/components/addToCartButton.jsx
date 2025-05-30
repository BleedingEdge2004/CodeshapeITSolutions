import React from 'react';
import { useCart } from '../context/cartContext.js';
import axios from 'axios';
import { API } from "../utils/api.js"

const AddToCartButton = ({ productId }) => {
    const { dispatch } = useCart();

    const handleAdd = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `${API}/cart/add`,
                { productId },
                { headers: { Authorization: ` Bearer ${token}` } }
            );
            dispatch({ type: 'UPDATE_CART', payload: res.data.cart });
        } catch (error) {
            console.error('Add to cart failed', error);
        }
    };

    return (
        <button className="add-to-cart-btn" onClick={handleAdd}>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;