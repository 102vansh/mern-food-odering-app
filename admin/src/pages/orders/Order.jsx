// import React from 'react'
// import './oeder.css'
// import axios from 'axios'
// import { useEffect } from 'react'
// import toast,{ Toaster } from 'react-hot-toast'
// import { useState } from 'react'
// import { assets } from '../../admin_assets/assets'
// const Order = () => {
//   const[order,setOrder] = useState([])

// const fetchallOrders = async () => {
//   try {
//     const res = await axios.get("http://localhost:3000/api/v1/order/list")
//     setOrder(res.data.data)
//     console.log(res.data)
//     toast.success(res.data.message)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const statushandler = async(id,status)=>{
  
//     const res = await axios.post(`http://localhost:3000/api/v1/order/update`,{status,id})
//     if(res.data.success){
//        await fetchallOrders()
//     }
    
  
// useEffect(() => {
//   fetchallOrders()
// },[])
//   return (
//     <div className='order add'>
// <h3>Order page</h3>
// <div className='order-list'>

// {order.map((order,index)=>(
//   <div key={index} className='order-item'>
//   <img src={assets.parcel_icon} alt="" />
//   <div className='order-item-food'>
//     {order.items.map((item,index)=>{
//       if(index === order?.item?.length-1){
//         return item?.name + " X " + item?.quantity
//       }else{
//         return item?.name + " X " + item?.quantity + ", "
//       }

//       })}
//       <p className='order-item-name'>{order?.address?.firstname+" "+order?.address?.lastname}</p>
//       <p className='order-item-address'>
//       <p>{order?.address?.street+""}</p>
//       <p>{order?.address?.city+", "+order?.address?.state+" "+order?.address?.country}</p>
//       </p>
      

//   </div>
//   <p className='order-item-phone'>{order?.address?.phone}</p>
//       <p className='order-item-status'>{order?.status}</p>
//     <p>${order?.item?.items?.price}</p>
//     <select value={order?.status} onChange={(e)=>statushandler(order._id,e.target.value) }>
//       <option value='Food Processing'>Food Processing</option>
//       <option value='Out of Delivery'>Out of Delivery</option>
//       <option value='Delivered'>Delivered</option>
//     </select>
//   </div>
// ))}
// </div>
// <Toaster/>
//     </div>
//   )
// }
// }
// export default Order


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './oeder.css';
import { assets } from '../../admin_assets/assets';

const Order = () => {
  const [order, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/order/list');
      setOrder(res.data.data);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch orders');
    }
  };

  const statusHandler = async (id, status) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/order/update`, { status, id });
      if (res.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div style={{color:'black'}} className='order add'>
      <h3>Order page</h3>
      <div className='order-list'>
        {order.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='' />
            <p> ${order?.items?.reduce((total, item) => total + item.price, 0)}</p>
            <div className='order-item-food'>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + ' X ' + item.quantity;
                } else {
                  return item.name + ' X ' + item.quantity + ', ';
                }
              })}
              <p className='order-item-name'>
                {order?.address?.firstname + ' ' + order?.address?.lastname}
              </p>
              <div className='order-item-address'>
                <p>{order?.address?.street}</p>
                <p>
                  {order?.address?.city + ', ' + order?.address?.state + ' ' + order?.address?.country}
                </p>
              </div>
            </div>
            <p className='order-item-phone'>{order?.address?.phone}</p>
            <p className='order-item-status'>{order?.status}</p>
            
            <select value={order?.status} onChange={(e) => statusHandler(order._id, e.target.value)}>
              <option value='Food Processing'>Food Processing</option>
              <option value='Out of Delivery'>Out of Delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default Order;
