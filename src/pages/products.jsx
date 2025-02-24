import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]); // State to store product data
    const navigate = useNavigate(); // navigate hook

    // Fetch products from the API
    useEffect(() => {
        async function fetchProducts() {
            try {
                let res = await axios.get('http://localhost:3000/products');
                setProducts(res.data); // Update state with the fetched products
            } catch (error) {
                console.error('Fetching products Error:', error);
            }
        }
        fetchProducts();
    }, []);

    // Redirect to productDetails page
    const handleViewDetails = (product) => {
        localStorage.setItem('productDetails', JSON.stringify([product])); 
        navigate('/productDetails');
    };

    // Add product to cart and store in localStorage
    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage
        cart.push(product); // Add product to cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        console.log('Product added to cart:', product); // Log the product details to the console
    };

    return (
        <div>
            <h1>All Products</h1>
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => {
                        console.log(product);
                        return (
                            <li key={index}>
                                <h3>{product.name}</h3>
                                {/* Check if image exists before accessing photoURI */}
                                {product.image && product.image.photoURI ? (
                                    <img src={product.image.photoURI} style={{ width: '200px', height: '200px' }} alt={product.name} />
                                ) : (
                                    <p>No image available</p> // print thsi if no image is available
                                )}
                                <p>${product.price}</p>
    
                                <button onClick={() => handleViewDetails(product)}>View Details</button>
                                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </li>
                        )
                    })
                ) : (
                    <p>Loading products...</p>
                )}
            </ul>
        </div>
    );
}
