import React from 'react'
import './Footer.css'
import { assets } from '../../frontend_assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
    <div className="footer-content">
    <div className='left'>
<img src={assets.logo} />
<p>lorem ipsum lorem ipsum lorem ipsum dumy tet dumy </p>
<div className='social-icons'>
<img src={assets.facebook_icon} />
    <img src={assets.twitter_icon} />
    <img src={assets.linkedin_icon} />

</div>
    </div>
    <div className='middle'>
    <h2>company</h2>
    <ul>
<li>Home</li>
<li>About</li>
<li>Services</li>
<li>Blog</li>
<li>Contact</li>
    </ul>
    </div>
    <div className='right'>
    <h2>Get in touch</h2>
    <li>+91 123456789</li>
    <li>5Sb2j@example.com</li>
    </div>
    </div>
    <hr></hr>
<p className='copyright'>© 2022. All rights reserved</p>
    </div>
  )
}

export default Footer