import React from 'react'
import {Routes,Route} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'
import Sidebars from './Components/Sidebar/Sidebars'
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from './Pages/Orders/Order';
import{ToastContainer} from'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    const url="https://ukfj-backend.onrender.com"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebars/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/order" element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
