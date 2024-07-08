import React from 'react'
import Navbar from './component/navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/place-order/Placeorder'
import Footer from './component/footer/Footer'
import Loginpop from './component/loginpop/Loginpop'
import { useState } from 'react'
import Verify from './pages/verify/Verify'
import Myorder from './pages/myorders/Myorder'
import { Toaster } from 'react-hot-toast'
import Trackorder from './pages/TrackOrder/Trackorder'

const App = () => {
  const[show,setshow] = useState(false)
  return (
    
    <div>
    {
      show? <Loginpop setshow={setshow}/>:<></>
    }
      <Navbar setshow={setshow}/>
    
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route  path ='/cart' element = {<Cart/>}></Route>
      <Route path = '/placeorder' element = {<Placeorder/>}></Route>
      <Route path = '/verify' element = {<Verify/>}></Route>
      <Route path = '/myorders' element= {<Myorder/>}></Route>
      <Route path='/trackorder' element = {<Trackorder/>}></Route>
      </Routes>

      <Footer/>
      <Toaster/>
    </div>
  )
}

export default App