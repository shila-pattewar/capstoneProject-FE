import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
    const [product, setProduct] = useState(null); // State to hold the product details
    const [cart, setCart] = useState([]); // State to hold the cart
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
    const [updatedProduct, setUpdatedProduct] = useState({}); // State for updated product details
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

    // Handle the Update button click (start editing mode)
    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
        setUpdatedProduct({ ...product }); // Pre-fill form with current product data
    };

    // Handle the Cancel edit button
    const handleCancelEdit = () => {
        setIsEditing(false); // Exit edit mode
    };

    // Handle input change when updating the product
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle the Save changes button click (update product in database)
    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${product.id}`, updatedProduct);
            console.log('Product updated:', response.data);

            // Update product in localStorage and state
            const updatedProductList = JSON.parse(localStorage.getItem('productDetails')) || [];
            updatedProductList[0] = response.data; // Replace the updated product in localStorage
            localStorage.setItem('productDetails', JSON.stringify(updatedProductList));

            setProduct(response.data); // Update product state

            setIsEditing(false); // Exit edit mode
            console.log('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
            console.log('Failed to update the product.');
        }
    };

    // Handle delete product button click
    const handleDeleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:3000/products/${product.id}`);
            console.log('Product deleted from database');

            // Remove the product from localStorage
            localStorage.removeItem('productDetails');

            // Navigate to the product list page after deletion
            navigate('/products');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (!product) {
        return <p>Loading...</p>; // Display loading text if the product is not found
    }

    // Check if the product has an image and fallback if necessary
    const productImage = product.image ? product.image.photoURI : 'default-image-url.jpg'; // Use a default image if the product doesn't have an image

    return (
        <div>
            <h1>Product Details</h1>

            {isEditing ? (
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Ingredients:
                        <input
                            type="text"
                            name="ingredients"
                            value={updatedProduct.ingredients?.join(', ')}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>
                    <br />
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>{product.name}</h2>
                    <img
                        src={productImage} // Set the image source (falling back to a default image if necessary)
                        alt={product.name}
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

                    {/* Update and Delete buttons */}
                    <button onClick={handleEditClick}>Update Product</button>
                    <button onClick={handleDeleteProduct}>Delete Product</button>
                </div>
            )}
        </div>
    );
}
