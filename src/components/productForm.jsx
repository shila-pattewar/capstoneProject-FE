import React, { useState } from "react";

export default function ProductForm({ onSubmit }) {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    ingredients: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      setProductData((prevState) => ({
        ...prevState,
        ingredients: value.split(",").map((ingredient) => ingredient.trim()), // Splitting ingredients by comma
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
      ingredients: [],
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
          value={productData.ingredients.join(", ")}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
}
