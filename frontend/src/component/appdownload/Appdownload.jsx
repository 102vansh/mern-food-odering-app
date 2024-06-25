import React from 'react'
import { assets } from '../../frontend_assets/assets'
import './appdownload.css'
const Appdownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
        <p style={{width:'50%',margin:'auto'}}>For the best experience, download our app from Google Play and App Store</p>
        <div className='appstore'>
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default Appdownload