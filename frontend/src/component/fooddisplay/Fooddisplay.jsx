import React, { useContext } from 'react'
import './fooddisplay.css'
import { Storecontext } from '../../context/Store'
import Fooditem from '../fooditem/Fooditem'
const Fooddisplay = ({category}) => {
    const{food_list} = useContext(Storecontext)
    console.log(food_list)
  return (
    <div className='food-display' id='food'>
    <h2 style={{marginLeft:'30px'}}>Top Dishes near you</h2>
    <div style={{marginLeft:'20px'}} className="food-container">
    {food_list?.map((food,index)=>{
      if(category === 'All' || category === food.category)
        return <Fooditem key={index} id={food._id} name ={food.name} price={food.price} image={food.image.url} description={food.description}/>
    })
    }
    </div>
    

    </div>
  )
}

export default Fooddisplay