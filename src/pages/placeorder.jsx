import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlaceOrder() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    // Fetch cart items from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        // Calculate total price
        const total = storedCart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
        setTotalPrice(total);
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    // Handle order submission
    const handlePlaceOrderSubmit = () => {
        if (!name || !address) {
            alert('Please fill in both name and address.');
            return;
        }

        // Handle order submission (e.g., sending order to the backend)

        // Clear cart after placing order
        localStorage.removeItem('cart');
        setCart([]); // Clear cart from the state

        navigate('/confirmation'); // Redirect to the confirmation page
    };

    return (
        <div>
            <h1>Place Your Order</h1>
            {cart.length > 0 ? (
                <>
                    <h3>Your Cart Items:</h3>
                    {/* <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                            </li>
                        ))}
                    </ul> */}

                    <h3>Total Price: ${totalPrice}</h3>

                    {/* Order Form */}
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Enter your name"
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Address:
                            <textarea
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Enter your address"
                                required
                            />
                        </label>
                        <br />
                        <button type="button" onClick={handlePlaceOrderSubmit}>Place Order</button>
                    </form>

                    <p><strong>Cash on Delivery</strong></p>
                </>
            ) : (
                <p>Your cart is empty. Please add items to your cart first.</p>
            )}
        </div>
    );
}
