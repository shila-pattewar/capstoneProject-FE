import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/productForm';

export default function updateProducts() {
    const [products, setProducts] = useState(0);

    // Fetch products from the API
    useEffect(() => {
        async function fetchProducts() {
            try {
                console.log("getting data sucussful")
                let res = await axios.get('http://localhost:3000/products');
                setProducts(res.data); // Update state with the fetched products
                console.log(res.data)
            } catch (error) {
                console.error('Error while fetching products:', error);
                setLoading(false); // Stop loading in case of error
            }
        }
        fetchProducts();
    }, []);

    
    return (
        <div>
            <h1>Update Data</h1>
            <ProductForm />
        </div>
    );
}