import { useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// pages
import Home from "./pages/home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import UpdateProduct from "./pages/updateproduct";
import Confirmation from "./pages/Confirmation";
import PlaceOrder from "./pages/PlaceOrder";
import ProductDetails from "./pages/productDetails";

function App() {
  const [products, setProducts] = useState(0);
  return (
    <>
      <nav>
        <Link to={"/"}> Home </Link> | |<Link to={"/products"}> Products </Link>{" "}
        | |<Link to={"/cart"}> Cart </Link> | |
        <Link to={"/login"}> Login </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        {/* <Route path='/products/:id' element={<ProductDetails/>} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
