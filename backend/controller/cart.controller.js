const User = require('../models/user.models')


exports.addtocart = async (req, res,next) => {
    try{
        const id = req.user._id
let user = await User.findById(id)
let cartdata = user.cartdata
if(!cartdata[req.body.itemid]){
    cartdata[req.body.itemid] = 1
   
}else{
    cartdata[req.body.itemid] = cartdata[req.body.itemid] + 1
}
await User.findByIdAndUpdate(id,{cartdata})
res.status(200).json({
    success:true,
    message:"item added to cart",
    cartdata
})
    }catch(error){
return next(error)
    }
}



exports.removecart = async (req, res,next) => {
    try{
    let user = await User.findById(req.user._id)
    let cartdata = user.cartdata
    if(cartdata[req.body.itemid] > 0){
        cartdata[req.body.itemid] = cartdata[req.body.itemid] - 1
    }
    await User.findByIdAndUpdate(req.user._id,{cartdata})
    res.status(200).json({
        success:true,
        message:"item removed from cart",
        cartdata
    })

}catch(error){
return next(error)
}
    
}


exports.fetchcartdata = async (req, res,next) => {
    try{
let user = await User.findById(req.user._id)
let cartdata = user.cartdata
res.status(200).json({
    success:true,
    cartdata
})
    }catch(error){
return next(error)
    }
}