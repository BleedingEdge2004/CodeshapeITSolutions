import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/cartContext.js'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/cartContext.js'; // Uncomment if using useCart hook
const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Optionally load cart from backend here in future
    }, []);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.product._id} className="cart-item">
                            <img src={item.product.image} alt={item.product.name} width="100" />
                            <div>
                                <h4>{item.product.name}</h4>
                                <p>{item.product.description}</p>
                                <p>Price: ₹{item.product.price}</p>
                                <p>
                                    Quantity:
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                                        min="1"
                                    />
                                </p>
                                <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <h3>Total: ₹{getCartTotal()}</h3>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </>
            )}
        </div>
    );
};

export default CartPage;