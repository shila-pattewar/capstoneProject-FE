import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
    const [products, setProducts] = useState([]); // State to store product data

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

    return (
        <div>
            <h1>All Products</h1>
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <li key={index}>
                            <p>{product.image}</p>
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </ul>
        </div>
    );
}