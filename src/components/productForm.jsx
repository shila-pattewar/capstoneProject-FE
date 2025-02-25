import React, { useState } from 'react';

export default function ProductForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');

    // Handle input changes
    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleIngredientsChange = (e) => setIngredients(e.target.value);
    const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!name || !photo || !price || !ingredients) {
            alert('Please fill in all fields');
            return;
        }

        const productData = {
            name,
            price,
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()), // Split ingredients by commas and trim spaces
            photo, // Assuming photo is a file, which will be sent as part of a FormData object
        };

        // Pass product data back to the parent component (UpdateProducts) via onSubmit
        onSubmit(productData);

        // Clear form after submission
        setName('');
        setPrice('');
        setIngredients('');
        setPhoto(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleNameChange} required />
            <br />
            <label>Photo URI:</label>
            <input type="file" onChange={handlePhotoChange} required />
            <br />
            <label>Price:</label>
            <input type="text" value={price} onChange={handlePriceChange} required />
            <br />
            <label>Ingredients:</label>
            <input
                type="text"
                value={ingredients}
                onChange={handleIngredientsChange}
                required
                placeholder="Comma separated ingredients"
            />
            <br />
            <button type="submit">Create Product</button>
        </form>
    );
}
