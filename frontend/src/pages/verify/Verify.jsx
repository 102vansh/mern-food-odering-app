import React, { useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Storecontext } from '../../context/Store'
import axios from 'axios'
import { useEffect } from 'react'
import './verify.css'
const Verify = () => {
    const[searchparams,setSearchParams]= useSearchParams()
    const success = searchparams.get("success")
    const order_id = searchparams.get("order_id")
    console.log(success,order_id)
    const{url,token} = useContext(Storecontext)
    const navigate = useNavigate()
const verifypayment = async()=>{
    console.log(token)
    const response = await axios.post(`${url}/api/v1/order/verify`,{success,order_id},{
        headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    
    })
    if(response.data.success){
        navigate('/myorders')
        console.log(token)
    }
    else{
        navigate('/')
    }
    console.log(data)
}
useEffect(()=>{
    verifypayment()
},[])

  return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}

export default Verify