import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
    const navigate = useNavigate();

    // Fetch cart items from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        // Calculate the total price of items in the cart
        const total = storedCart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
        setTotalPrice(total);
    }, []);

    // Handle removing an item from the cart
    const handleRemoveFromCart = (index) => {
        const updatedCart = cart.filter((item, i) => i !== index); // Remove item from cart
        setCart(updatedCart); // Update the state
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage

        // Recalculate the total price after removing an item
        const total = updatedCart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
        setTotalPrice(total);
    };

    // Handle the "Place an Order" button click
    const handlePlaceOrder = () => {
        // Redirect to the PlaceOrder page
        navigate('/placeorder');
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                                <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: ${totalPrice}</h3> {/* Display total price */}
                    <button onClick={handlePlaceOrder}>Place an Order</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}
