import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import toast from 'react-hot-toast'
const List = () => {

    const[list,setlist] = useState([])
const fetchlist = async()=>{
    try{
    const response = await axios.get('http://localhost:3000/api/v1/food/get')
console.log(response.data.food)
setlist(response.data.food)
toast.success(response.data.message)
    }
    catch(err){
        console.log(err)
        toast.error(err.response.data.message)
    }
    
}
useEffect(()=>{
    fetchlist()
},[])
const removefood = async(id)=>{
    try{
        const response = await axios.delete(`http://localhost:3000/api/v1/food/delete/${id}`)
        toast.success(response.data.message)
        fetchlist()
    }
    catch(err){
        toast.error(err.response.data.message)
    }
}

  return (
    <div>
        <p>ALL Food list</p>
        <div className='list-tabel'>
        <div className='list-tabel-format title'>
        <b>Image</b>
        <b>Name</b>
        <b>Price</b>
        <b>Category</b>
        <b>Action</b>
        </div>
        {
            list.map((item,index)=>{
return(
    <div key={index} className='list-tabel-format'>
        <img src={item.image.url}  alt="" />
        <p>{item.name}</p>
        <p>$ {item.price}</p>
        <p>{item.category}</p>
        <button onClick={()=>removefood(item._id)}>Delete</button>
        </div>
)


            })
        }

        </div>
    </div>
  )
}

export default List