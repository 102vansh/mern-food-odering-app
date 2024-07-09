import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
        <div className='header-content'>
        <h2>Order Your favorite food from home</h2>
        <p>Choose from a wide range of delicious food from your favorite restaurants  Enjoy your food experience at home   </p>
        <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header