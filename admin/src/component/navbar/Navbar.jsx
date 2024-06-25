import React from 'react'
import {assets} from '../../admin_assets/assets'
import './navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="logo" />
        <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default Navbar