import React, { useContext } from 'react'
import { Storecontext } from '../../context/Store'
import './cart.css'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const{cartitem,food_list,removecart,totalcartamount} = useContext(Storecontext)

const navigate = useNavigate()


  return (
    <div className='cart'>
    <div className='cart-item'>
<div className='cart-items-title'>
<p>Food Item</p>
<p>Name</p>
<p>Price</p>
<p>Quantity</p>
<p>Total</p>
<p>Remove</p>


    </div>
    <br/>
    <hr/>
    {
      food_list.map((item,index)=>{
        if(cartitem[item._id]>0){
          return(
            <div className='cart-items-title cart-items-item'>
              <img src={item.image.url} alt={item.name} />
              <p> {item.name}</p>
              <p> ${item.price}</p>
              <p>{cartitem[item._id]}</p>
<p>${item.price*cartitem[item._id]}</p>
<p onClick={()=>removecart(item._id)} className='cross'>X</p>
<hr className='full-width-hr' />
            </div>
            
            
          )
        }
          
      })
    }
    
    </div>
    <div className='cart-bottom'>
    <div className='total'>
      <h2>Cart Totals</h2>
      <div>
        <div className='details'>
          <p>Subtotal</p>
          <p>${totalcartamount()}</p>
        </div>
        <hr/>
        <div className='details'>
<p>Delivery Fee</p>
<p>${totalcartamount===0? 0:5}</p>

        </div>
        <hr/>
        <div className='details'>
<b>Total</b>
<b>$ {totalcartamount() + 5}</b>
        </div>
      </div>
      <button onClick={()=>navigate('/placeorder')}>Checkout</button>
    </div>
<div className='promocode'>
  <p>If you have a promocode, enter it here</p>
  <div className='promocode-input'>
    <input type="text" />
    <button>Apply</button>
  </div>
</div>
    </div>

    </div>
  )
}

export default Cart