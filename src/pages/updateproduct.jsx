import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]); // State to store product data
    const [isEditing, setIsEditing] = useState(false); // To toggle between edit and view modes
    const [editProduct, setEditProduct] = useState(null); // Product being edited
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: { photoURI: '' } }); // State for creating a new product
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

    

    return (
       <></>
    );
}