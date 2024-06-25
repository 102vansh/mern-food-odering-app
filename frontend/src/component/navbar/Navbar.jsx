import React, { useContext } from 'react'
import { assets } from '../../frontend_assets/assets'
import './navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Storecontext } from '../../context/Store'
import { useNavigate } from 'react-router-dom'
const Navbar = ({setshow}) => {
const[menu,setmenu]=useState('home')
const{totalcartamount,token,settoken} = useContext(Storecontext)
const [dropdownVisible, setDropdownVisible] = useState(false);
const navigate = useNavigate()
const logout = ()=>{
  localStorage.removeItem('token')
  settoken('')
  navigate('/')
}
const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

  return (
    <div className='navbar'>
   <Link to='/' > <img src={assets.logo} alt="logo" className="logo" /></Link>
    <ul>
        <Link to='/' onClick={()=>setmenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore' onClick={()=>setmenu('menu')} className={menu === 'menu' ? 'active' : ''} >menu</a>
        <a href='#appdownload' onClick={()=>setmenu('mobilrapp')} className={menu === 'mobilrapp' ? 'active' : ''}>mobile-app</a>
        <a href='#footer' onClick={()=>setmenu('contactus')} className={menu === 'contactus' ? 'active' : ''}>contact us</a>
        

    </ul>
    <div className='navbar-right'>
        <img src={assets.search_icon} alt="search" />
        <div className='navbar-search-icon'>
          <Link to='/cart'>  <img src={assets.basket_icon} alt="cart" /></Link>
            <div className={totalcartamount() > 0 ? 'dot' : ''}></div>
            
        </div>

      {/* {!token?<button style={{marginBottom:'14px'}} onClick={() => setshow(true)}>login</button>:<div className='profile'>
        <img src={assets.profile_icon} alt="profile" />
        <ul className='profile-dropdown'>
            <li onClick={() => navigate('myorders')}><img src={assets.bag_icon} alt="bag" />Orders</li>
            <hr></hr>
            <li onClick={logout}><img src={assets.logout_icon} alt="heart" />logout</li>
        </ul>
        </div>
        }   */}

        {!token ? (
          <button style={{ marginBottom: '14px' }} onClick={() => setshow(true)}>login</button>
        ) : (
          <div className='profile' onClick={toggleDropdown}>
            <img src={assets.profile_icon} alt="profile" />
            <ul className={`profile-dropdown ${dropdownVisible ? 'visible' : ''}`}>
              <li onClick={() => navigate('myorders')}><img src={assets.bag_icon} alt="bag" />Orders</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="heart" />logout</li>
            </ul>
          </div>
        )}

    </div>

    </div>
  )
}

export default Navbar


