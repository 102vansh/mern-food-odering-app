import React, { useContext, useEffect, useState } from 'react'
import { Storecontext } from '../../context/Store'
import { useNavigate } from 'react-router-dom'
import './placeorder.css'
import axios from 'axios'
const Placeorder = () => {
  const{totalcartamount,token,cartitem,url,food_list} = useContext(Storecontext)
const navigate = useNavigate()
const[data,setdata ] = useState({
  firstname:'',
  lastname:'',
  email:'',
  street:'',
  city:'',
  state:'',
  pincode:'',
  country:'',
  phone:'',
})
const onchangehandler = (e)=>{
  const name = e.target.name
  const value = e.target.value
  setdata({...data,[name]:value})
}



useEffect(()=>{
console.log(data)
},[data])

// const orderplace = async(e)=>{
//   e.preventDefault()
//   let orderitems = []
//   food_list.map((item)=>{
  
//     console.log(item)
//     if(cartitem[item._id]>0){
//       let iteminfo = item
//       iteminfo['quantity'] = cartitem[item._id]
//       orderitems.push(iteminfo)
//     }
//   })
//   let orderdata = {
//     address:data,
//     items:orderitems,
//     totalamount:totalcartamount() + 5
//   }
//   let response = await axios.post(`http://localhost:3000/api/v1/order/create`,{orderdata},{
//     headers:{
//       "Authorization":`Bearer ${token}`
//     }
//   })
//   console.log(response.data)
//   if(response.data.success){
//   const {session_url} = response.data
//   window.location.assign(session_url)
//   }
//   else{
//     alert(response.data.message)
//   }
//   console.log(orderitems)

// }



const orderplace = async (e) => {
  e.preventDefault();

  let orderitems = [];
  food_list.forEach((item) => {
    if (cartitem[item._id] > 0) {
      let iteminfo = { ...item };  // Create a new object to avoid mutating the original
      iteminfo['quantity'] = cartitem[item._id];
      orderitems.push(iteminfo);
    }
  });

  let orderdata = {
    address: data,
    items: orderitems,
    totalamount: totalcartamount() + (totalcartamount() === 0 ? 0 : 5)
  };

  try {
    console.log('Order data being sent:', orderdata);
    console.log('Token:', token);
    
    let response = await axios.post(`http://localhost:3000/api/v1/order/create`, orderdata, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    console.log('Response data:', response.data);
    
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.assign(session_url);
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error placing order:', error);
  }
};

useEffect(() => {
  if(!token){
navigate('/cart')
  }
}, [token]);

  return (
    <form className='placeorder' onSubmit={orderplace}>
      <div className='placeorder-left'>
<p className='title'>Delivery Information</p>
<div className='multi-field'>
  <input required name='firstname' onChange={onchangehandler} value={data.firstname} type="text" placeholder='FirstName' />
  <input required name='lastname' onChange={onchangehandler} value={data.lastname} type="text" placeholder='LatName' />
</div>
<input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email' />
<input required name='street' onChange={onchangehandler} value={data.street} type='text' placeholder='Street' />
<div className='multi-field'>
  <input required name='city' onChange={onchangehandler} value={data.city}  type="text" placeholder='City' />
  <input required name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State' />
</div>
<div className='multi-field'>
  <input required name='pincode' onChange={onchangehandler} value={data.pincode} type="number" placeholder='Pincode' />
  <input required name='country' onChange={onchangehandler} value={data.country} type="text" placeholder='Country' />
</div>
<input required name='phone' onChange={onchangehandler} value={data.phone} type ='number' placeholder='Phone' />
      </div>
      <div className='placeorder-right'>
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
<p>${totalcartamount === 0?0:5}</p>

        </div>
        <hr/>
        <div className='details'>
<b>Total</b>
<b>$ {totalcartamount() + 5}</b>
        </div>
      </div>
      <button type='submit'>Place Order</button>
    </div>
      </div>
    </form>
  )
}

export default Placeorder


// import React, { useContext, useEffect, useState } from 'react';
// import { Storecontext } from '../../context/Store';
// import { useNavigate } from 'react-router-dom';
// import './placeorder.css';
// import axios from 'axios';

// const Placeorder = () => {
//   const { totalcartamount, token, cartitem, url, food_list } = useContext(Storecontext);
//   const navigate = useNavigate();
//   const [data, setdata] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     pincode: '',
//     country: '',
//     phone: '',
//   });

//   const onchangehandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setdata({ ...data, [name]: value });
//   };

//   useEffect(() => {
//     console.log(data);
//   }, [data]);

//   const orderplace = async (e) => {
//     e.preventDefault();
//     let orderitems = [];
//     food_list.forEach((item) => {
//       if (cartitem[item._id] > 0) {
//         let iteminfo = { ...item };
//         iteminfo['quantity'] = cartitem[item._id];
//         orderitems.push(iteminfo);
//       }
//     });

//     let orderdata = {
//       address: data,
//       items: orderitems,
//       totalamount: totalcartamount() + (totalcartamount() === 0 ? 0 : 5),
//     };

//     try {
//       let response = await axios.post(`http://localhost:3000/api/v1/order/create`, orderdata, {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.assign(session_url);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form className='placeorder' onSubmit={orderplace}>
//       <div className='placeorder-left'>
//         <p className='title'>Delivery Information</p>
//         <div className='multi-field'>
//           <input required name='firstname' onChange={onchangehandler} value={data.firstname} type="text" placeholder='FirstName' />
//           <input required name='lastname' onChange={onchangehandler} value={data.lastname} type="text" placeholder='LastName' />
//         </div>
//         <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email' />
//         <input required name='street' onChange={onchangehandler} value={data.street} type='text' placeholder='Street' />
//         <div className='multi-field'>
//           <input required name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City' />
//           <input required name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State' />
//         </div>
//         <div className='multi-field'>
//           <input required name='pincode' onChange={onchangehandler} value={data.pincode} type="number" placeholder='Pincode' />
//           <input required name='country' onChange={onchangehandler} value={data.country} type="text" placeholder='Country' />
//         </div>
//         <input required name='phone' onChange={onchangehandler} value={data.phone} type='number' placeholder='Phone' />
//       </div>
//       <div className='placeorder-right'>
//         <div className='total'>
//           <h2>Cart Totals</h2>
//           <div>
//             <div className='details'>
//               <p>Subtotal</p>
//               <p>${totalcartamount()}</p>
//             </div>
//             <hr />
//             <div className='details'>
//               <p>Delivery Fee</p>
//               <p>${totalcartamount() === 0 ? 0 : 5}</p>
//             </div>
//             <hr />
//             <div className='details'>
//               <b>Total</b>
//               <b>$ {totalcartamount() + (totalcartamount() === 0 ? 0 : 5)}</b>
//             </div>
//           </div>
//           <button type='submit'>Place Order</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Placeorder;
