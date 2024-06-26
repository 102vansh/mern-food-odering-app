import {createContext, useEffect} from 'react';
// import { food_list } from '../frontend_assets/assets';
import { useState } from 'react';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export const Storecontext = createContext(null);


const Storecontextprovider = ({children}) => {
    const[cartitem,setcartitem] = useState({})
    const [token,settoken] = useState('')
    const[food_list,setfetchlist] = useState([])
    const addtocart = async(itemid) => {

        if (!itemid) {
            console.error("addtocart called with undefined itemid");
            console.log(token)
            return;
          }else{
        setcartitem((prevCart) => ({
          ...prevCart,
          [itemid]: (prevCart[itemid] || 0) + 1,
        }));
      }
console.log(token)// token ara hai
try{
      if(token){
        console.log(token) //token ara hai
     const response = await axios.post(`http://localhost:3000/api/v1/cart/add`,{itemid},{
      headers: {
          Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
  })
      toast.success(response.data.message)
     console.log(response.data)
                  }
}catch(err){
    console.log(err)
     
      }
      };
    
      const removecart = async(itemid) => {
        setcartitem((prevCart) => ({
          ...prevCart,
          [itemid]: (prevCart[itemid] || 0) - 1,
        }));
        if(token){
          await axios.post(`http://localhost:3000/api/v1/cart/delete`,{itemid},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        })
        }
      };

// useEffect(() => {
//     console.log(cartitem)
// }, [cartitem])

const totalcartamount = () =>{
    let total = 0
    for (let item in cartitem){
        if(cartitem[item]>0){
        let iteminfo = food_list.find(food => food._id ===item)
        total += iteminfo.price * cartitem[item]
        }
    }

    return total
}
const fetchfoodlist = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/food/get',{withCredentials:true})
    setfetchlist(response.data.food)
}
const localcartdata = async(token) =>{
  const response = await axios.post(`http://localhost:3000/api/v1/cart/get`,{},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
})

setcartitem(response.data.cartdata)
}
useEffect(() => {
  
  async function loaddata() {
    await fetchfoodlist()
    if(localStorage.getItem('token')){
      settoken(localStorage.getItem('token'))
      await localcartdata(localStorage.getItem('token'))
    }
  }
  loaddata()
}, [])

const url = 'http://localhost:3000'
    


    return (
        <Storecontext.Provider value={{food_list,cartitem,addtocart,removecart,totalcartamount,url,token,settoken}}>{children}</Storecontext.Provider>
    )


}

export default Storecontextprovider