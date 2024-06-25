import React from 'react'
import { useState } from 'react'
import { assets } from '../../frontend_assets/assets'
import './login.css'
import { useEffect } from 'react'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import { Storecontext } from '../../context/Store'

const Loginpop = ({setshow}) => {
  const{url,token,settoken} = useContext(Storecontext)
    const[cureent,setcurrent] = useState('Sign-Up')
    const[data,setdata] = useState({
      name:'',
      email:'',
      password:''
    })
const onchangehandler= (e)=>{
  const name= e.target.name
  const value = e.target.value
  setdata({
    ...data,
    [name]:value
  })
}
const onlogin = async(e)=>{
e.preventDefault()
let  newurl = url
if(cureent === 'Login'){
newurl += '/api/v1/user/login'
}else{
  newurl += '/api/v1/user/register'
}
try{
const reaponse = await axios.post(newurl,data)
console.log(reaponse.data)
if(reaponse.data.success){
  settoken(reaponse.data.token)
  console.log(reaponse.data.token)
  localStorage.setItem('token',reaponse.data.token)
  setshow(false)
  toast.success(reaponse.data.message)
}else{
  toast.error(reaponse.data.message)
}
}catch(error){
console.log(error)
}
}

useEffect(()=>{
  console.log(data)
},[data])

  return (
    <div className='loginpop'>
        <form className='loginpop-box' onSubmit={onlogin}>
        <div className='title'>
            <h1>{cureent}</h1>
            <img onClick={()=>setshow(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='input-box'>
      {cureent === 'Login' ? <></>:<input name='name' onChange={onchangehandler} value={data.name}  type='text' placeholder=' Enter Username' />}  
        <input name='email' onChange={onchangehandler} value={data.email} type='text' placeholder=' EnterEmail' />
        <input type='text' name='password' onChange={onchangehandler} value={data.password} placeholder=' Enter Password' />
        </div>
        <button type='submit'>{cureent === 'Sign-Up' ? 'Sign-Up' : 'Login'}</button>
        <div className='condition'>
            <input type='checkbox'  required/>
            <p>I agree to the Terms of Service and Privacy Policy</p>
        </div>
        {cureent ==='Login' ? <>Create an New account?<span onClick={()=>setcurrent('Sign-Up')}>Sign-Up</span></> : <p>Already have an account?<span onClick={()=>setcurrent('Login')}>Login</span></p>}
    
        </form>
        <Toaster/>
    </div>
  )
}

export default Loginpop