import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
    const [product, setProduct] = useState(null); // State to hold the product details
    const [cart, setCart] = useState([]); // State to hold the cart
    const navigate = useNavigate(); // Navigate hook to go back to the product list page

    // Fetch product details from localStorage
    useEffect(() => {
        const storedProduct = JSON.parse(localStorage.getItem('productDetails'))[0]; // Get the first product from localStorage
        setProduct(storedProduct); // Set the product to state

        // Load cart from localStorage if exists
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart); // Set cart from localStorage
    }, []);

    // Handle adding product to cart
    const handleAddToCart = () => {
        const newCart = [...cart, product]; // Create a new cart array with the added product
        setCart(newCart); // Update state
        localStorage.setItem('cart', JSON.stringify(newCart)); // Store the cart in localStorage
        console.log('Product added to cart!');
    };

    // Go back to the Products page
    const handleGoBack = () => {
        navigate('/products'); // Navigate to the products page
    };

    if (!product) {
        return <p>Loading...</p>; // Display loading text if the product is not found
    }

    // Check if the product has an image and fallback if necessary
    const productImage = product.image ? product.image.photoURI : 'default-image-url.jpg'; // Use a default image if the product doesn't have an image

    return (
        <div>
            <h1>Product Details</h1>
            <div>
                <h2>{product.name}</h2>
                <img src={productImage} alt={product.name}
                    style={{ width: '200px', height: '200px' }}
                />
                <p>Price: ${product.price}</p>
                <h3>Ingredients:</h3>
                {product.ingredients && product.ingredients.length > 0 ? (
                    <ul>
                        {product.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No ingredients available.</p>
                )}
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleGoBack}>Back to Products</button>
            </div>
        </div>
    );
}
