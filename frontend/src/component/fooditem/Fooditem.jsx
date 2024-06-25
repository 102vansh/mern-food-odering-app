import React, { useContext } from 'react'
import { assets } from '../../frontend_assets/assets'
import './fooditem.css'

import { Storecontext } from '../../context/Store'
const Fooditem = ({id,name,price,image,description}) => {
    const{cartitem,setcartitem,addtocart,removecart}=useContext(Storecontext)
  return (
    <div className='food-item'>
    <div className="food-img">
      <img src={image} alt={name} />
      {
        !cartitem[id]? <img className='add' onClick={() => addtocart(id)} src={assets.add_icon_white} alt="add" /> : <div className=" food-itemcount">
            <img onClick={() => removecart(id)} src={assets.remove_icon_red} alt="remove" />
            <p>{cartitem[id]}</p>
            <img onClick={() => addtocart(id)} src={assets.add_icon_green} alt="add" />
        </div>
      }
    </div>
    <div className="food-item-info">
      <div className='food-name'>
     <p> {name}</p>
     <img src={assets.rating_starts} alt="rating" />
     </div>
     <p className='food-description'>{description}</p>
      
        <p className='food-price'> <span style={{color:"tomato"}}>₹</span> {price}</p>
        
      
    </div>
    

    </div>
  )
}

export default Fooditem