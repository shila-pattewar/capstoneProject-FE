import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]); // State to store product data
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        async function fetchProducts() {
            try {
                let res = await axios.get('http://localhost:3000/products');
                setProducts(res.data); // Update state with the fetched products
            } catch (error) {
                console.error('Error while fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const handleProductDetails = (product) => {
        console.log('product Details:', product);
        navigate('/productDetails');
    };

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <li key={index}>
                             <h3>{product.name}</h3>
                             <p>{product.image}</p>
                             <p>${product.price}</p>
                             
                            <button onClick={() => handleProductDetails(product)}>Product Details</button>
                        </li>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </ul>
        </div>
    );
}
