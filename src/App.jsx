import { useState } from 'react'
import { Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

//componets
import HomePage from './component/HomePage'
import Header from './component/Header'
import Footer from './component/Footer'
import ProductPage from './component/Productpage'
import ProductDetails from './component/ProductDetails'
import PlaceOrder from './component/PlaceOrder'
import Confirmation from './component/Confirmation'
import Cart from './component/Cart'

function App(){
  const[count, setCount] = useState(0)
  return(
    <>
      <Header />
      <nav>
          <Link to={'/'}>Home</Link> | |  
          <Link to={'/products'}>Products</Link> | |   
          <Link to={'/cart'}>Cart</Link>
        </nav>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/products' element={<ProductPage/>} />
            <Route path='/products/:id' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/placeorder' element={<PlaceOrder/>} />
            <Route path='/confirmation' element={<Confirmation/>} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
        <Footer />
    </>
  )
}

export default App