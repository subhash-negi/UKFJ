import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrder.css';
import {assets} from "../../assets/assets"
import { StoreContext } from '../../Context/StoreContext';
const Myorder = () => {
  const {url,token}=useContext(StoreContext)
  const [data,setdata]=useState([]);

  const fetchOrders=async()=>{
    const response= await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setdata(response.data.data);

  }
  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {
          data.map((order,index)=>{
            return(
              <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt=""/>
                <p>{order.items.map((item,index)=>{
                  if(index===order.items.length-1)
                    return item.name+" X "+item.quantity
                  else
                    return item.name+" X "+item.quantity+", "
                })}</p>
                <p> ₹ {order.amount}</p>
                <p>Items:{order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button className="hover:bg-green-400"onClick={fetchOrders}>Track Order</button>
                </div>
            )
          })
        }
        </div>      
    </div>
  )
}

export default Myorder;