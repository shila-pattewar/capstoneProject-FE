// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Products() {
//     const [products, setProducts] = useState([]); // State to store product data
//     const [cart, setCart] = useState([]); // State to store cart items
//     const navigate = useNavigate(); // navigate hook

//     // Fetch products from the API
//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 let res = await axios.get('http://localhost:3000/products');
//                 setProducts(res.data); // Update state with the fetched products
//             } catch (error) {
//                 console.error('Fetching products Error:', error);
//             }
//         }
//         fetchProducts();
//     }, []);

//     // Redirect to productDetails page
//     const handleViewDetails = (product) => {
//         localStorage.setItem('productDetails', JSON.stringify([product])); 
//         navigate('/productDetails');
//     };

//     // Add product to cart and log product details in the console
//     const handleAddToCart = (product) => {
//         setCart((prevCart) => [...prevCart, product]); // Add product to cart state
//         console.log('Product added to cart:', product); // Log the product details to the console
//     };

//     return (
//         <div>
//             <h1>All Products</h1>
//             <ul>
//                 {products.length > 0 ? (
//                     products.map((product, index) => (
//                         <li key={index}>
//                             <h3>{product.name}</h3>
//                             <p>{product.image}</p>
//                             <p>${product.price}</p>

//                             <button onClick={() => handleViewDetails(product)}>View Details</button>
//                             <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//                         </li>
//                     ))
//                 ) : (
//                     <p>Loading products...</p>
//                 )}
//             </ul>

//             {/* Optional: Display Cart */}
//             <h2>Your Cart</h2>
//             <ul>
//                 {cart.length > 0 ? (
//                     cart.map((item, index) => (
//                         <li key={index}>
//                             <h4>{item.name}</h4>
//                             <p>${item.price}</p>
//                         </li>
//                     ))
//                 ) : (
//                     <p>Your cart is empty.</p>
//                 )}
//             </ul>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]); // State to store product data
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

    // Redirect to productDetails page
    const handleViewDetails = (product) => {
        localStorage.setItem('productDetails', JSON.stringify([product])); 
        navigate('/productDetails');
    };

    // Add product to cart and store in localStorage
    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage
        cart.push(product); // Add product to cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        console.log('Product added to cart:', product); // Log the product details to the console
    };

    return (
        <div>
            <h1>All Products</h1>
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <li key={index}>
                            <h3>{product.name}</h3>
                            <p>{product.image}</p>
                            <p>${product.price}</p>

                            <button onClick={() => handleViewDetails(product)}>View Details</button>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </li>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </ul>
        </div>
    );
}
