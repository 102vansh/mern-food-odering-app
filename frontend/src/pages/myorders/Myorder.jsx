// import React, { useContext } from 'react'
// import './myorder.css'
// import { useState,useEffect } from 'react'
// import { Storecontext } from '../../context/Store'
// import axios from 'axios'
// import { assets } from '../../frontend_assets/assets'
// const Myorder = () => {
//     const{token} = useContext(Storecontext)
//     console.log(token)
//     const[data,setdata] = useState([])
// const fetchorder = async()=>{
//     try{
//         console.log(token)
// const response = await axios.post(`http://localhost:3000/api/v1/order/myorders`,{},{
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
// })
// console.log(response.data)
// setdata(response.data.data)
//     }catch(error){
// console.log(error)
//     }
// }

// useEffect(()=>{
//     if(token){
//     fetchorder()
//     }
// },[token])

//   return (
//     <div className='myorders'>
//     <h2>My orders</h2>
//     <div className='container'>
//     {
//         data.map((order,index) =>{
//             return(
//                 <div className='myorders-item' key={index}>
//                 <img src={assets.parcel_icon} alt="" />
//                     <p>{order?.item?.map((item,index)=> {
//                         if(index=== order.item.length -1){
//                             return item?.name+ "x"+item?.quantity
//                         }
//                         else{
//                             return item?.name+ "x"+item?.quantity+" , "
//                         }
//                     })}</p>
//                     <p>{order?.amount}.00</p>
//                     <p>Items:{order?.item?.length}</p>
//                     <p><span>&#x2713;</span><b>{order?.status}.00</b></p>
//                     <button>Track Order</button>
//                 </div>
//             )
//         })
//     }
    
//         </div>
//     </div>
//   )
// }

// export default Myorder


import React, { useContext } from 'react';
import './myorder.css';
import { useState, useEffect } from 'react';
import { Storecontext } from '../../context/Store';
import axios from 'axios';
import { assets } from '../../frontend_assets/assets';
import { Link } from 'react-router-dom';

const Myorder = () => {
    const { token } = useContext(Storecontext);
    console.log("Token:", token);
    const [data, setData] = useState([]);

    const fetchOrder = async () => {
        try {
            console.log("Fetching orders with token:", token);
            const response = await axios.post(
                `http://localhost:3000/api/v1/order/myorders`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("API Response:", response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrder();
        }
    }, [token]);

    return (
        <div className='myorders'>
            <h2>My orders</h2>
            <div className='container'>
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div className='myorders-item' key={index}>
                            <img src={assets.parcel_icon} alt="" />
                                  <p style={{fontWeight:"bold",marginLeft:"30px",color:"black"}}> $ {order?.items?.reduce((acc, item) =>{
                                    return acc + item.price
                                  },0)}.00</p>
                            <p style={{color:"black"}}>
                                {order?.items?.map((item, index) => {
                                  
                                    if (index === order?.item?.length - 1) {
                                 
                                        return item?.name + "x" + item?.quantity;

                                    } else {
                                        return item?.name + "x" + item?.quantity + " , ";
                                    }
                                   
                                })}
                            </p>
                           
                            <p style={{color:"black"}}>Items: {order?.items?.length}</p>
                            <p>
                                <span style={{color:"black"}}>&#x25cf;</span><b style={{color:"black"}}>{order?.status}</b>
                            </p>
                           <Link to={'/trackorder'}><button>Track Order</button></Link> 
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Myorder;

