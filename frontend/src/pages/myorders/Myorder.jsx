import React, { useContext } from 'react'
import './myorder.css'
import { useState,useEffect } from 'react'
import { Storecontext } from '../../context/Store'
import axios from 'axios'
import { assets } from '../../frontend_assets/assets'
const Myorder = () => {
    const{token} = useContext(Storecontext)
    console.log(token)
    const[data,setdata] = useState([])
const fetchorder = async()=>{
    try{
        console.log(token)
const response = await axios.post(`http://localhost:3000/api/v1/order/myorders`,{},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
})
console.log(response.data)
setdata(response.data.data)
    }catch(error){
console.log(error)
    }
}

useEffect(()=>{
    if(token){
    fetchorder()
    }
},[token])

  return (
    <div className='myorders'>
    <h2>My orders</h2>
    <div className='container'>
    {
        data.map((order,index) =>{
            return(
                <div className='myorders-item' key={index}>
                <img src={assets.parcel_icon} alt="" />
                    <p>{order?.item?.map((item,index)=> {
                        if(index=== order.item.length -1){
                            return item?.name+ "x"+item?.quantity
                        }
                        else{
                            return item?.name+ "x"+item?.quantity+" , "
                        }
                    })}</p>
                    <p>{order?.amount}.00</p>
                    <p>Items:{order?.item?.length}</p>
                    <p><span>&#x2713;</span><b>{order?.status}.00</b></p>
                    <button>Track Order</button>
                </div>
            )
        })
    }
    
        </div>
    </div>
  )
}

export default Myorder
