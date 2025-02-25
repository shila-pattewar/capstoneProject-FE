import React, { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, productToEdit, isEditing }) {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    ingredients: "",
  });

  // Pre-populate the form if editing an existing product
  useEffect(() => {
    if (isEditing && productToEdit) {
      setProductData({
        name: productToEdit.name,
        price: productToEdit.price,
        ingredients: productToEdit.ingredients.join(", "),
      });
    }
  }, [isEditing, productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      setProductData((prevState) => ({
        ...prevState,
        ingredients: value,
      }));
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(productData); // Call the onSubmit function from parent
    setProductData({
      name: "",
      price: "",
      ingredients: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          name="ingredients"
          value={productData.ingredients}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        {isEditing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
