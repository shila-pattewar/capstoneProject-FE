import React, { useEffect, useState } from 'react';

export default function Cart() {
    const [cart, setCart] = useState([]);

    // Fetch cart items from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // Handle removing an item from the cart
    const handleRemoveFromCart = (index) => {
        const updatedCart = cart.filter((item, i) => i !== index); // Remove item from cart
        setCart(updatedCart); // Update the state
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <h4>{item.name}</h4>
                            <p>${item.price}</p>
                            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}
