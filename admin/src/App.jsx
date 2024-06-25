import React from 'react'
import Navbar from './component/navbar/Navbar'
import Sidebar from './component/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/orders/Order'
import List from './pages/list/List'
import Add from './pages/add/Add'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className='app-content' style={{display:'flex'}}>
        <Sidebar/>
        <Routes>
        <Route path='/add' element={<Add/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/list' element={<List/>}/>
    
      </Routes>
      </div>
      
    </div>
  )
}

export default App