import { useState } from 'react'
import { Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// //componets
// import HomePage from './component/HomePage'
// import Header from './component/Header'
// import Footer from './component/Footer'
// import ProductPage from './component/Productpage'
// import ProductDetails from './component/ProductDetails'
// import PlaceOrder from './component/PlaceOrder'
// import Confirmation from './component/Confirmation'
// import Cart from './component/Cart'

// pages
import Home from './pages/home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import PlaceOrder from './pages/PlaceOrder'

function App(){
  const[count, setCount] = useState(0)
  return(
    <>
      <nav>
          <Link to={'/'}> Home </Link> | |  
          <Link to={'/products'}> Products </Link> | |   
          <Link to={'/cart'}> Cart </Link>
        </nav>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/products' element={<Products/>} />
            {/* <Route path='/products/:id' element={<ProductDetails/>} /> */}
            <Route path='/cart' element={<Cart/>} />
            <Route path='/placeorder' element={<PlaceOrder/>} />
            <Route path='/confirmation' element={<Confirmation/>} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
    </>
  )
}

export default App