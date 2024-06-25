import React, { useState } from 'react'
import Header from '../../component/header/Header'
import Explore from '../../component/exploremenu/Explore'
import Fooddisplay from '../../component/fooddisplay/Fooddisplay'
import Appdownload from '../../component/appdownload/Appdownload'

const Home = () => {
    const[category,setcategory] = useState('All')
  return (
    <div>
        <Header/>
        <Explore category={category} setcategory={setcategory}/>
        <Fooddisplay category={category}/>
        <Appdownload/>
    </div>
  )
}

export default Home