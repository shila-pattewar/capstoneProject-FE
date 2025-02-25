import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/productForm';

export default function UpdateProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // To show loading state during data fetch

    // Get 
    useEffect(() => {
        async function fetchProducts() {
            try {
                let res = await axios.get('http://localhost:3000/products');
                setProducts(res.data); // Update state with the fetched products
                console.log(res.data);
                setLoading(false); // Stop loading once the products are fetched
            } catch (error) {
                console.error('Error while fetching products:', error);
                setLoading(false); // Stop loading in case of error
            }
        }
        fetchProducts();
    }, []);

    // POST
    const handleCreateProduct = async (productData) => {
        try {
            const response = await axios.post('http://localhost:3000/products', productData);
            console.log('Product created:', response.data);
            // Optionally, fetch the updated list of products after creation
            setProducts([...products, response.data]); // Update the product list with the newly added product
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Display loading message or list of products
    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div>
            <h1>Update Data</h1>
            {/* Pass the handleCreateProduct function to ProductForm */}
            <ProductForm onSubmit={handleCreateProduct} />
            
            {/* Render a list of current products */}
            <h2>Current Products</h2>
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <li key={index}>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Ingredients: {product.ingredients.join(', ')}</p>
                            {/* You can add further product details here */}
                        </li>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </ul>
        </div>
    );
}
