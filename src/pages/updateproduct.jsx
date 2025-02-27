import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/productForm";

export default function UpdateProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // GET request to display all the products
  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await axios.get("http://localhost:3000/products");
        console.log("Fetched products:", res.data); // Log to check products
  
        // If the backend returns _id, map it to id for consistency
        const productsWithId = res.data.map((product) => ({
          ...product,
          id: product._id, // Map _id to id for consistency everywhere
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

    // Check if any field is empty
    if (!productData.name || !productData.price || !productData.ingredients || productData.ingredients.length === 0) {
      alert("Please fill in all fields and provide at least one ingredient.");
      return; // Stop the submission if validation fails
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        productData
      );
      setProducts((prevProducts) => [...prevProducts, data]);
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

    // Check if any field is empty
    if (!productData.name || !productData.price || !productData.ingredients || productData.ingredients.length === 0) {
      alert("Please fill in all fields and provide at least one ingredient.");
      return; // Stop the submission if validation fails
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

  // DELETE request to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      // Make the DELETE request to remove the product by ID
      const response = await axios.delete(
        `http://localhost:3000/products/${productId}`
      );
      console.log("Deleted product response:", response.data);

      // Remove the deleted product from the products state
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
      console.log(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
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
