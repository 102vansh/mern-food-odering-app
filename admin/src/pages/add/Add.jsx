import React, { useEffect, useState } from 'react'
import { assets } from '../../admin_assets/assets'
import './add.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const Add = () => {
    const[loading,setloading] = useState(false)
    const[image,setimage] = useState(false)
    const[data,setdata] = useState({name:'',
        description:'',
        category:'Salad',
        price:''})
        const onchangehandler = (e)=>{
            const name = e.target.name
            const value = e.target.value
            setdata({...data,[name]:value})
        }
        
        const onsubmit = async(e)=>{
            setloading(true)
            e.preventDefault()
            const fd = new FormData()
            fd.append('image',image)
            fd.append('name',data.name)
            fd.append('description',data.description)
            fd.append('category',data.category)
            fd.append('price',Number(data.price))
            
            const response = await axios.post('http://localhost:3000/api/v1/food/add',fd)
            if(response.data.success){
                setdata({
                    name:'',
        description:'',
        category:'Salad',
        price:''
                })
                setimage(false)
setloading(false)
                toast.success(response.data.message)
                
            }
            else{
toast.error(response.data.message)
setloading(false)
            }
            
        }
if(loading){
    return <h1>Loading....</h1>
}
  return (
    <div className='add'>
    <form className='flex-col' onSubmit={onsubmit}>
    <div className='add-img-upload flex-col'>
    <p>Upload Image</p>
    <label htmlFor="file">
    <img src={ image ? URL.createObjectURL(image) : assets.upload_area} alt="" />

    </label>
    <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='file' hidden required    />

    </div>
    <div className='add-product-name flex-col'>
    <p>Product Name</p>
    <input onChange={onchangehandler} value={data.name} type="text" name='name' placeholder='Product Name' />
    </div>
    <div className='add-product-description flex-col'>
    <p>Product Description</p>
    <textarea onChange={onchangehandler} value={data.description} type="text" name='description' placeholder='Product Description' />
    </div>
    <div className='add-product-category flex-col'>
    <p>Product Category</p>
    <select onChange={onchangehandler} value={data.category} name='category' >
        <option value="Salad">Salad</option>
        <option value="Rolls">Rolls</option>
        <option value="Deserts">Deserts</option>
        <option value="Sandwich">Sandwich</option>
        <option value="Cake">Cake</option>
        <option value="Pure Veg">Pure Veg</option>
        <option value="Pasta">Pasta</option>
        <option value="Noodles">Noodles</option>

    </select>
    </div>
    <div className='add-product-price flex-col'>
    <p>Product Price</p>
    <input onChange={onchangehandler} value={data.price} type="number" name='price' placeholder='Product Price' />
    </div>
    <button className='btn'>Add Product</button>

    </form>
<Toaster/>
    </div>
  )
}

export default Add