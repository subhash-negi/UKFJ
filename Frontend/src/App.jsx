import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Routes,Route}from 'react-router-dom'
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Footer from './Components/Footer/Footer';
import LoginPopUp from './Components/LoginPopUp/LoginPopUp';
import PlaceOrders from './Pages/PlaceOrders/PlaceOrders';

import Myorder from './Pages/MyOrder/Myorder';
import ExploreMenu from './Components/ExploreMenu/ExploreMenu';


const App = () => {
  const[showLogin,setShowLogin]=useState(false);
  return (
    <>
    {
      showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>
    }
      <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/orders" element={<PlaceOrders/>}/>
          <Route path="/myorder" element={<Myorder/>}/>
      </Routes>

    </div>
    <Footer/>
    </>
  
  )
}

export default App