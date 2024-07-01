import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import "./Cart.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const navigate=useNavigate();
  const {cartItems,food_list,RemoveFromCart,getTotalCartAmount,url,token,setCartItems}=useContext(StoreContext);
  // useEffect(()=>{
  //   console.log("this useeffect run");
  //   const loadCartData=async(token)=>{
  //     const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
  //     setCartItems(response.data.cartData);
  // }
  // loadCartData(token)
  // },[])
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {
          food_list.map((item,index)=>{          
              if(cartItems[item._id]>0)
              {
                return(
                  <>
                   <div key={index}className='cart-items-title cart-items-item'>
                      <img src={url+"/images/"+item.image}></img>
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>₹{item.price*cartItems[item._id]}</p>
                      <p onClick={()=>RemoveFromCart(item._id)} className='cross'>X</p>
                    </div>
                    <hr></hr>
                  </>
                 
                )

              }
          })
        }
      </div>
      < div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Delivery</p>
              <p>{getTotalCartAmount()>0?30:0}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount()>0?getTotalCartAmount()+30:getTotalCartAmount()}</b>
            </div>
          </div>
          <button onClick={()=>navigate("/orders")}>PROCEED TO CHECKOUT</button>
        </div>
      
      <div className="cart-promocode">
        <div>
            <p>If you have a promo code,Enter it here</p>
            <div className='cart-promocode-input'>
               <input type="text" placeholder='promo code'></input>
               <button>Submit</button>
            </div>
        </div>
      
      </div>
      </div>
    </div>
  )
}

export default Cart