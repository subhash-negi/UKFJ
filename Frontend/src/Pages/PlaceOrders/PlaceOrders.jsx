import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";
const PlaceOrders = () => {
    const Navigate=useNavigate();
    const {getTotalCartAmount,token,food_list,cartItems,url,setCartItems}=useContext(StoreContext)
    useEffect(()=>{
      if(!token){
        Swal.fire({
          icon: 'error',
          title: 'Oops.....',
          text: 'Please login first',
        })
        Navigate('/cart');
      }
      else if(getTotalCartAmount()===0){
        Navigate('/cart');
      }
    },[token])
    const[data,setData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    })
    
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const placeOrder=async(event)=>{
      event.preventDefault();
      let orderItems=[];
      
      food_list.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"]=cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
     
      let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+30,
      }
      
      let {data:{order,orderId}}=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    
      const options={
        key:"rzp_test_uvJoULdGngYSdR",
        amount:order.amount,
        name:"UKFJ",
        description:"testing this web application",
        image:"https://www.addressguru.in/images/19479625.jpg",
        order_id:order.id,
       "handler": async function (response)
        {
          const payment_id=response.razorpay_payment_id;
          const order_id=response.razorpay_order_id;
          const signature=response.razorpay_signature;
          
          const verificationdata={payment_id,order_id,signature,orderId};
          const answer=await axios.post(url+"/api/order/verification",verificationdata);
          Swal.fire({
            title: "Order Placed Successfully",
            icon: "success",
          });
          Navigate("/myorder")
          const responsed=await axios.post(url+"/api/cart/get",{},{headers:{token}})
          setCartItems(responsed.data.cartData);
        },
   

        prefill:{
          name:data.firstName+" "+data.lastName,
          email:data.email,
          contact:data.phone,

        },
        notes:{
          "address":data.street+" "+data.state+" "+data.city+" "+data.country+" "+data.zipcode,

        },
        theme:{
          "color":"#3399cc"
        }, 
        "modal": {
        "ondismiss": function(){
            window.location.replace("http://localhost:5173");
        }
      }  


      };
      const razor=new window.Razorpay(options);
      razor.open();
      razor.on('payment.failed', async function (response)
      {
        
         console.log(orderId);
         razor.close();
        const res=await axios.post(url+"/api/order/payment",{orderId});
      
        Swal.fire({
          title: "The payment failed",
          showConfirmButton:false,
          text: "Cannot Push Your Order To The Queue.",
          icon: "error",
          timer:2000
        });
        
      }
        
    );
   
       
}

const cashondelivery=async()=>{
      
      if(data.firstName==""||data.lastName==""||data.email==""||data.street==""||data.city==""||data.state==""||data.zipcode==""||data.country==""||data.phone==""){
        Swal.fire({
          title: "Enter the delievery information",
          showConfirmButton:false,
          text: "Cannot add your order to the queue",
          icon: "error",
          timer:2000
        });
      }
      else{
          let orderItems=[];
        
        food_list.map((item)=>{
          
          if(cartItems[item._id]>0){
            let itemInfo = item;
            itemInfo["quantity"]=cartItems[item._id];
            orderItems.push(itemInfo);
          }
        })
      
        let orderData={
          address:data,
          items:orderItems,
          amount:getTotalCartAmount()+30,
        }
        console.log(orderData);
        
        const response=await axios.post(url+"/api/order/cashondelivery",orderData,{headers:{token}});
       
        if(response.data.success){
          Swal.fire({
            title: "Order Placed Successfully",
            icon: "success",
          });
          Navigate("/myorder")
        }
          const responsed=await axios.post(url+"/api/cart/get",{},{headers:{token}})
          setCartItems(responsed.data.cartData);
      }
  
}

  return (
    <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
                <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
                <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
            </div>
                 <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'/>
                 <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street"/>
            <div className="multi-fields">
                <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
                <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
            </div>
            <div className='multi-fields'>
                 <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode}  type="text" placeholder='Zip code'/>
                 <input required name="country" onChange={onChangeHandler} value={data.country}  type="text" placeholder='Country'/>
            </div>
            <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
        </div>
        <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>SubTotal</p>
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
          <div className='payment-buttons flex justify-between'>
               <button className='btn-1 hover:bg-orange-400' type="button"
               onMouseOver={(e) => {
    e.target.setAttribute('data-tooltip', 'Currently unavailable');
  }}
  onMouseOut={(e) => {
    e.target.removeAttribute('data-tooltip');
  }}
  >ONLINE PAYMENT</button>
               <button className='btn-2' type="button" onClick={cashondelivery}>CASH ON DELIVERY</button>    
          </div>
          
        </div>
        </div>
    </form>
  )
}

export default PlaceOrders