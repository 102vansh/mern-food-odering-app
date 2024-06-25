import React from 'react'
import './explore.css'
import { menu_list } from '../../frontend_assets/assets'
const Explore = ({category,setcategory}) => {
  return (
    <div className='explore' id='explore'>
    <h1>Explore Our Menu</h1>
    <p className='explore-p'>Discover a variety of dishes from our menu. </p>

    <div className='explore-menu-li'>
        {
            menu_list.map((item,index)=>{
                return <div onClick={()=>setcategory(prev=>prev===item.menu_name?'All':item.menu_name)} key={index} className='explore-menu-item'>
                <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="image" />
                <p>{item.menu_name}</p>
                </div>
        })
        }
    </div>

<hr></hr>
    </div>
  )
}

export default Explore