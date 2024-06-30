import React, { useContext } from 'react'
import './Header.css'
import { StoreContext } from '../../Context/StoreContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate();
  const {token}=useContext(StoreContext);
  const order=()=>{
    if(localStorage.getItem("token")){
      /// function to scroll
    }
    else{
      Swal.fire({
        icon:"error",
        text:"Please Login "
      })
    }
  }
  return (
    <div className='header'>
        <div  className="header-contents"> 

      
       <h2 className='text-stone-200'>
          Order Food from <br/>anywhere & <br/> anytime
       </h2>
          
          <p>
          Indulge in the Richness of <br></br> <span className='font-bold text-stone-100 text-3xl ml-5'>Indian Cuisine</span>.
          </p>
       
         
          <button onClick={order}>ORDER ONLINE</button>
        
          
       
            
        </div>
  
    </div>
  )
}

export default Header