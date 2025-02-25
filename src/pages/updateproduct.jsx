import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/productForm";

export default function UpdateProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await axios.get("http://localhost:3000/products");
        console.log("Fetched products:", res.data); // Log to check products

        // If the backend returns _id, map it to id for consistency
        const productsWithId = res.data.map((product) => ({
          ...product,
          id: product._id, // Map _id to id for consistency
        }));

        setProducts(productsWithId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // POST request to create a new product
  const handleCreateProduct = async (productData) => {
    console.log("Submitting product data:", productData);
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        productData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Created product response:", response.data);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // PUT request to update an existing product
  const handleUpdateProduct = async (productData) => {
    if (!productToEdit || !productToEdit.id) {
      console.error("Product to edit is missing or does not have an id.");
      return; // Don't proceed if there's no valid product or id
    }

    console.log("Updating product with ID:", productToEdit.id); // Log the id

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${productToEdit.id}`,
        productData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Updated product response:", response.data);

      // Update the product list with the updated product
      const updatedProducts = products.map((product) =>
        product.id === productToEdit.id ? response.data : product
      );
      setProducts(updatedProducts);

      // Reset editing state
      setIsEditing(false);
      setProductToEdit(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle Edit Button Click
  const handleEditProduct = (product) => {
    // Ensure product has a valid id (either _id or id)
    if (!product._id && !product.id) {
      console.error("Product does not have a valid id");
      return;
    }

    console.log("Editing product:", product); // Log product being edited
    setIsEditing(true);
    setProductToEdit({ ...product, id: product._id || product.id }); // Ensure `id` is correctly set
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1>Update Products</h1>
      <ProductForm
        onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct}
        productToEdit={productToEdit}
        isEditing={isEditing}
      />

      <h2>Current Products</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => {
            const key = product.id ? product.id : index;
            return (
              <li key={key}>
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Ingredients: {product.ingredients.join(", ")}</p>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
              </li>
            );
          })
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
}
