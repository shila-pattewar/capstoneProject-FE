import React, { useEffect } from 'react';
import axios from 'axios';

export default function Products() {

    useEffect(() => {
        async function fetchProducts() {
            try {
                let res = await axios.get('http://localhost:3000/products');
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>All Products</h1>
        </div>
    );
}