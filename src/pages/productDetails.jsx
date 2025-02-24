import React, { useState, useEffect } from 'react';

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <h4>{item.name}</h4>
                            <p>${item.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}
